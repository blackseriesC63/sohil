import { PartialType } from '@nestjs/swagger';
import { CreateCutomerDto } from './create-cutomer.dto';

export class UpdateCutomerDto extends PartialType(CreateCutomerDto) {}
