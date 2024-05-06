import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Menu_items } from '@prisma/client';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('menu-items')
@Injectable()
export class MenuItemsService {
  constructor(private readonly prismaService: PrismaService) {}

  @ApiOperation({ summary: 'Create a menu item' })
  async create(createMenuItemDto: CreateMenuItemDto): Promise<Menu_items> {
    return this.prismaService.menu_items.create({
      data: {
        name: createMenuItemDto.name,
        price: createMenuItemDto.price,
        description: createMenuItemDto.description,
        image: createMenuItemDto.image,
        food_categoryId: createMenuItemDto.food_categoryId,
      },
    });
  }

  @ApiOperation({ summary: 'Get all menu items' })
  async findAll(): Promise<Menu_items[]> {
    return this.prismaService.menu_items.findMany({
      include: {
        Food_category: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  async findOne(id: number): Promise<Menu_items | null> {
    const menuItem = await this.prismaService.menu_items.findUnique({
      where: {
        id,
      },
    });

    if (!menuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return menuItem;
  }

  @ApiOperation({ summary: 'Update a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  async update(
    id: number,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<Menu_items> {
    const existingMenuItem = await this.prismaService.menu_items.findUnique({
      where: {
        id,
      },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    return this.prismaService.menu_items.update({
      where: {
        id,
      },
      data: {
        name: updateMenuItemDto.name,
        price: updateMenuItemDto.price,
        description: updateMenuItemDto.description,
        image: updateMenuItemDto.image,
        food_categoryId: updateMenuItemDto.food_categoryId,
      },
    });
  }

  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  async remove(id: number): Promise<void> {
    const existingMenuItem = await this.prismaService.menu_items.findUnique({
      where: {
        id,
      },
    });

    if (!existingMenuItem) {
      throw new NotFoundException(`Menu item with ID ${id} not found`);
    }

    await this.prismaService.menu_items.delete({
      where: {
        id,
      },
    });
  }
}
