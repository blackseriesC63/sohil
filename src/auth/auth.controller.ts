import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Public } from '../common/decorators';
import { CreateAdminDto } from '../admin/dto/create-admin.dto';
import { Response } from 'express';
import { AccessTokenGuard } from '../common/guards';
import {
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { IsAdminGuard } from '../common/guards/is_admin.guard';

@Controller('auth')
@ApiTags('auth') // Add a tag for Swagger
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({ status: HttpStatus.OK, description: 'Sign in successful.' }) // Swagger documentation for successful sign in
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async signin(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signIn(createAuthDto, res);
  }

  @UseGuards(AccessTokenGuard)
  @Post('signOut')
  @ApiResponse({ status: HttpStatus.OK, description: 'Sign out successful.' }) // Swagger documentation for successful sign out
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  async signOut(@Res({ passthrough: true }) res: Response) {
    return this.authService.signOut(res);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user has been successfully created.',
  }) // Swagger documentation for successful creation
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  create(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @UseGuards(IsAdminGuard)
  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all users.' }) // Swagger documentation for successful retrieval
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the user with the specified ID.',
  }) // Swagger documentation for successful retrieval
  @ApiNotFoundResponse({ description: 'User Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
  }) // Swagger documentation for successful update
  @ApiNotFoundResponse({ description: 'User Not Found' }) // Swagger documentation for NotFound
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user has been successfully deleted.',
  }) // Swagger documentation for successful deletion
  @ApiNotFoundResponse({ description: 'User Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
