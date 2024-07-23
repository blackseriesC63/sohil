import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../admin/admin.service';
import { JwtPayload, Tokens } from './types';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import * as cookieParser from 'cookie-parser';
import { Admin } from '@prisma/client';
import { Response } from 'express';
import { ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { EmployeeService } from '../employee/employee.service';
import { CreateAuthDto, UpdateAuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly logger: Logger,
  ) {}

  @ApiInternalServerErrorResponse({ description: 'internal server error' })
  async getTokens(adminId: number, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: adminId,
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

  async updateRefreshToken(adminId: number, refreshToken: string) {
    const hashed_refresh_token = await bcrypt.hash(refreshToken, 10);
    await this.prismaService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        hashed_refresh_token,
      },
    });
  }

  async signIn(createAuthDto: CreateAuthDto, res: Response) {
    this.logger.debug('Signin', AdminService.name);
    const admin = await this.prismaService.admin.findUnique({
      where: {
        email: createAuthDto.email,
      },
    });
    if (!admin) {
      this.logger.error('Access denied');
      throw new BadRequestException('User does not exist');
    }

    const passwordMatch = await bcrypt.compare(
      createAuthDto.password,
      admin.hashed_refresh_password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = await this.getTokens(admin.id, admin.email);
    await this.updateRefreshToken(admin.id, tokens.refresh_token);

    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { tokens, message: 'signed in' };
  }

  async signOut(res: Response) {
    res.clearCookie('refresh_token');
    return { message: 'signed out successfully' };
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
