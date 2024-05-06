import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuItemsService } from './menu_items.service';
import { CreateMenuItemDto } from './dto/create-menu_item.dto';
import { UpdateMenuItemDto } from './dto/update-menu_item.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('menu-items')
@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @ApiOperation({ summary: 'Create a menu item' })
  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @ApiOperation({ summary: 'Get all menu items' })
  @Get()
  findAll() {
    return this.menuItemsService.findAll();
  }

  @ApiOperation({ summary: 'Get a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    return this.menuItemsService.update(+id, updateMenuItemDto);
  }

  @ApiOperation({ summary: 'Delete a menu item by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Menu item ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(+id);
  }
}
