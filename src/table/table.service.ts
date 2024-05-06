import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Table } from '@prisma/client';
import { ApiNotFoundResponse, ApiTags } from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Table') // Specify the Swagger tag for this service
@Injectable()
export class TableService {
  constructor(private readonly prismaService: PrismaService) {}

  async updateTableAvailability(
    tableId: number,
    isAvailable: boolean,
  ): Promise<void> {
    await this.prismaService.table.update({
      where: {
        id: tableId,
      },
      data: {
        isAvailable,
      },
    });
  }

  async create(createTableDto: CreateTableDto): Promise<Table> {
    return this.prismaService.table.create({
      data: {
        table_number: createTableDto.table_number,
        capacity: createTableDto.capacity,
        isAvailable: createTableDto.isAvailable,
      },
    });
  }

  async findAll(): Promise<Table[]> {
    return this.prismaService.table.findMany();
  }

  @ApiNotFoundResponse({ description: 'Table not found' })
  async findOne(id: number): Promise<Table | null> {
    const table = await this.prismaService.table.findUnique({
      where: {
        id,
      },
    });

    if (!table) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    return table;
  }

  @ApiNotFoundResponse({ description: 'Table not found' })
  async update(id: number, updateTableDto: UpdateTableDto): Promise<Table> {
    const existingTable = await this.prismaService.table.findUnique({
      where: {
        id,
      },
    });

    if (!existingTable) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    return this.prismaService.table.update({
      where: {
        id,
      },
      data: {
        table_number: updateTableDto.table_number,
        capacity: updateTableDto.capacity,
        isAvailable: updateTableDto.isAvailable,
      },
    });
  }

  @ApiNotFoundResponse({ description: 'Table not found' })
  async remove(id: number): Promise<void> {
    const existingTable = await this.prismaService.table.findUnique({
      where: {
        id,
      },
    });

    if (!existingTable) {
      throw new NotFoundException(`Table with ID ${id} not found`);
    }

    await this.prismaService.table.delete({
      where: {
        id,
      },
    });
  }
}
