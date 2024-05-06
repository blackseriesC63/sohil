import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Role') // Specify the Swagger tag for this service
@Injectable()
export class RoleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.prismaService.role.create({
      data: {
        role_name: createRoleDto.role_name,
      },
    });
  }

  async findAll(): Promise<Role[]> {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number): Promise<Role | null> {
    return this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });
  }

  @ApiNotFoundResponse({ description: 'Role not found' })
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const existingRole = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return this.prismaService.role.update({
      where: {
        id: id,
      },
      data: {
        role_name: updateRoleDto.role_name,
      },
    });
  }

  @ApiNotFoundResponse({ description: 'Role not found' })
  async remove(id: number): Promise<void> {
    const existingRole = await this.prismaService.role.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    await this.prismaService.role.delete({
      where: {
        id: id,
      },
    });
  }
}
