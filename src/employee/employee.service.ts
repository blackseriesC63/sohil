import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload, Tokens } from '../auth/types';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { SigninEmployeeDto } from './dto/signin.employee.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccessTokenGuard } from '../common/guards';

@ApiTags('employee')
@Injectable()
export class EmployeeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @ApiOperation({ summary: 'Get access and refresh tokens' })
  async getTokens(userId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @ApiOperation({ summary: 'Update the refresh token' })
  async updateRefreshToken(employeeId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.employee.update({
      where: {
        id: employeeId,
      },
      data: {
        hashedRefreshToken,
      },
    });
  }

  @ApiOperation({ summary: 'Sign in an employee' })
  @ApiResponse({ status: 200, description: 'Successfully signed in' })
  async signIn(signinEmployeeDto: SigninEmployeeDto, res: Response) {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        email: signinEmployeeDto.email,
      },
    });
    if (!employee) {
      throw new BadRequestException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(
      signinEmployeeDto.hashed_password,
      employee.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getTokens(employee.id, employee.email);
    await this.updateRefreshToken(employee.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { tokens, message: 'signed in' };
  }

  @ApiOperation({ summary: 'Sign out an employee' })
  async signOut(res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'signed out successfully' };
  }

  @ApiOperation({ summary: 'Create an employee' })
  async create(createEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);
    const newEmployee = await this.prismaService.employee.create({
      data: {
        name: createEmployeeDto.name,
        roleId: createEmployeeDto.roleId,
        email: createEmployeeDto.email,
        phone: createEmployeeDto.phone,
        password: hashedPassword,
      },
    });
    return newEmployee;
  }

  @ApiOperation({ summary: 'Get all employees' })
  findAll() {
    return this.prismaService.employee.findMany({
      include: {
        Role: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get an employee by ID' })
  async findOne(id: number) {
    const employee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return employee;
  }

  @ApiOperation({ summary: 'Update an employee by ID' })
  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const existingEmployee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!existingEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prismaService.employee.update({
      where: {
        id,
      },
      data: {
        name: updateEmployeeDto.name,
        roleId: updateEmployeeDto.roleId,
        email: updateEmployeeDto.email,
        phone: updateEmployeeDto.phone,
      },
    });
  }

  @ApiOperation({ summary: 'Delete an employee by ID' })
  async remove(id: number) {
    const existingEmployee = await this.prismaService.employee.findUnique({
      where: {
        id,
      },
    });

    if (!existingEmployee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    return this.prismaService.employee.delete({
      where: {
        id,
      },
    });
  }
}
