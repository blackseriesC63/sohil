import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import {
  AccessTokenGuard,
  IsCreatorGuard,
  IsOwnAdminGuard,
} from '../common/guards';
import {
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { isCreditCard } from 'class-validator';

@Controller('admin')
@ApiTags('admin') // Add a tag for Swagger
@ApiBearerAuth() // Add authentication requirement to Swagger documentation
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // @UseGuards(AccessTokenGuard)
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The admin has been successfully created.',
  }) // Swagger documentation for successful creation
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all admins.' }) // Swagger documentation for successful retrieval
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findAll() {
    return this.adminService.findAll();
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the admin with the specified ID.',
  }) // Swagger documentation for successful retrieval
  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The admin has been successfully updated.',
  }) // Swagger documentation for successful update
  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The admin has been successfully deleted.',
  }) // Swagger documentation for successful deletion
  @ApiNotFoundResponse({ description: 'Admin Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  remove(@Param('id') id: string) {
    return this.adminService.deleteById(+id);
  }
}
