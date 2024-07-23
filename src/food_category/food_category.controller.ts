// food_category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FoodCategoryService } from './food_category.service';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { handleError } from '../common/errors/errorHandlingFile';
import { AccessTokenGuard } from '../common/guards';

@ApiTags('food-category')
@Controller('food-category')
export class FoodCategoryController {
  constructor(private readonly foodCategoryService: FoodCategoryService) {}

  @ApiOperation({ summary: 'Create a food category' })
  @Post()
  async create(@Body() createFoodCategoryDto: CreateFoodCategoryDto) {
    try {
      return await this.foodCategoryService.create(createFoodCategoryDto);
    } catch (error) {
      const { message, status } = handleError(error);
      return { message, status };
    }
  }

  @ApiOperation({ summary: 'Get all food categories' })
  @Get()
  async findAll() {
    try {
      return await this.foodCategoryService.findAll();
    } catch (error) {
      const { message, status } = handleError(error);
      return { message, status };
    }
  }

  @ApiOperation({ summary: 'Get a food category by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Food category ID' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.foodCategoryService.findOne(+id);
    } catch (error) {
      const { message, status } = handleError(error);
      return { message, status };
    }
  }

  @ApiOperation({ summary: 'Update a food category by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Food category ID' })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFoodCategoryDto: UpdateFoodCategoryDto,
  ) {
    try {
      return await this.foodCategoryService.update(+id, updateFoodCategoryDto);
    } catch (error) {
      const { message, status } = handleError(error);
      return { message, status };
    }
  }

  @UseGuards(AccessTokenGuard)
  @ApiOperation({ summary: 'Delete a food category by ID' })
  @ApiParam({ name: 'id', type: 'number', description: 'Food category ID' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.foodCategoryService.remove(+id);
      return {
        message: 'Food category deleted successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      const { message, status } = handleError(error);
      return { message, status };
    }
  }
}
