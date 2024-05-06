import { PartialType } from '@nestjs/swagger';
import { CreateFoodCategoryDto } from './create-food_category.dto';

export class UpdateFoodCategoryDto extends PartialType(CreateFoodCategoryDto) {}
