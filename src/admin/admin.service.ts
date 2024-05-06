import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Admin } from '@prisma/client';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async create(createAdminDto: CreateAdminDto) {
    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const newUser = await this.prismaService.admin.create({
      data: {
        name: createAdminDto.name,
        email: createAdminDto.email,
        phone: createAdminDto.phone,
        hashed_refresh_password: hashedPassword,
        is_active: createAdminDto.is_active,
        is_creator: createAdminDto.is_creator,
      },
    });
    return newUser;
  }

  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findAll() {
    return this.prismaService.admin.findMany();
  }

  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async findOne(adminId: number): Promise<Admin> {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!admin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }

    return admin;
  }

  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async update(
    adminId: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const { name, email, phone, is_active, is_creator } = updateAdminDto;

    const existingAdmin = await this.prismaService.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!existingAdmin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }

    return this.prismaService.admin.update({
      where: {
        id: adminId,
      },
      data: {
        name,
        email,
        phone,
        is_active,
        is_creator,
      },
    });
  }

  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async deleteById(adminId: number): Promise<void> {
    const existingAdmin = await this.prismaService.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!existingAdmin) {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }

    await this.prismaService.admin.delete({
      where: {
        id: adminId,
      },
    });
  }
}
