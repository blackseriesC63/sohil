// food_category.service.ts
import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Food_category } from '@prisma/client';
import { CreateFoodCategoryDto } from './dto/create-food_category.dto';
import { CustomError } from '../common/errors/errorHandlingFile';
import { UpdateFoodCategoryDto } from './dto/update-food_category.dto';

@Injectable()
export class FoodCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    createFoodCategoryDto: CreateFoodCategoryDto,
  ): Promise<Food_category> {
    try {
      return await this.prismaService.food_category.create({
        data: {
          name: createFoodCategoryDto.name,
        },
      });
    } catch (error) {
      throw new CustomError(
        'Failed to create food category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Food_category[]> {
    try {
      return await this.prismaService.food_category.findMany();
    } catch (error) {
      throw new CustomError(
        'Failed to fetch food categories',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<Food_category | null> {
    try {
      const foodCategory = await this.prismaService.food_category.findUnique({
        where: { id },
      });
      if (!foodCategory) {
        throw new CustomError(
          `Food category with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return foodCategory;
    } catch (error) {
      throw new CustomError(
        'Failed to fetch food category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateFoodCategoryDto: UpdateFoodCategoryDto,
  ): Promise<Food_category> {
    try {
      const existingFoodCategory =
        await this.prismaService.food_category.findUnique({
          where: { id },
        });
      if (!existingFoodCategory) {
        throw new CustomError(
          `Food category with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return await this.prismaService.food_category.update({
        where: { id },
        data: { name: updateFoodCategoryDto.name },
      });
    } catch (error) {
      throw new CustomError(
        'Failed to update food category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const existingFoodCategory =
        await this.prismaService.food_category.findUnique({
          where: { id },
        });
      if (!existingFoodCategory) {
        throw new CustomError(
          `Food category with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.prismaService.food_category.delete({ where: { id } });
    } catch (error) {
      throw new CustomError(
        'Failed to delete food category',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
