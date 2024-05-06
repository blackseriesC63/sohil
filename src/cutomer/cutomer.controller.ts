import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CreateCutomerDto } from './dto/create-cutomer.dto';
import { UpdateCutomerDto } from './dto/update-cutomer.dto';
import { CustomerService } from './cutomer.service';
import { Customer } from '.prisma/client';
import {
  ApiResponse,
  ApiTags,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { SigninEmployeeDto } from '../employee/dto/signin.employee.dto';

@Controller('cutomer')
@ApiTags('cutomer') // Add a tag for Swagger
export class CutomerController {
  constructor(private readonly cutomerService: CustomerService) {}

  @Post('register')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async register(
    @Body() createCustomerDto: CreateCutomerDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.cutomerService.registration(
        createCustomerDto,
        res,
      );
      return res.status(201).json(response);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async login(@Body() loginDto: SigninEmployeeDto, @Res() res: Response) {
    try {
      const response = await this.cutomerService.login(loginDto, res);
      return res.status(200).json(response);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('logout')
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' })
  async logout(@Req() req: Request, @Res() res: Response) {
    return this.cutomerService.logout(req, res);
  }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The customer has been successfully created.',
  }) // Swagger documentation for successful creation
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  create(@Body() createCutomerDto: CreateCutomerDto): Promise<Customer> {
    return this.cutomerService.create(createCutomerDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: 'Returns all customers.' }) // Swagger documentation for successful retrieval
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findAll(): Promise<Customer[]> {
    return this.cutomerService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns the customer with the specified ID.',
  }) // Swagger documentation for successful retrieval
  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  findOne(@Param('id') id: string): Promise<Customer | null> {
    return this.cutomerService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The customer has been successfully updated.',
  }) // Swagger documentation for successful update
  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiBadRequestResponse({ description: 'Bad Request' }) // Swagger documentation for BadRequest
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  update(
    @Param('id') id: string,
    @Body() updateCutomerDto: UpdateCutomerDto,
  ): Promise<Customer> {
    return this.cutomerService.update(+id, updateCutomerDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The customer has been successfully deleted.',
  }) // Swagger documentation for successful deletion
  @ApiNotFoundResponse({ description: 'Customer Not Found' }) // Swagger documentation for NotFound
  @ApiInternalServerErrorResponse({ description: 'Internal Server Error' }) // Swagger documentation for InternalServerError
  remove(@Param('id') id: string): Promise<void> {
    return this.cutomerService.remove(+id);
  }
}
