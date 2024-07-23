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
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Response } from 'express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger'; // Import necessary Swagger decorators
import { AccessTokenGuard } from '../common/guards';
import { SigninEmployeeDto } from './dto/signin.employee.dto';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags('employee') // Add API tags
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @ApiOperation({ summary: 'Employee Signin' }) // Describe the operation
  @ApiResponse({ status: 200, description: 'Successful Signin' })
  @Post('signin')
  async signin(
    @Body() signinEmployeeDto: SigninEmployeeDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.employeeService.signIn(signinEmployeeDto, res);
  }

  @ApiOperation({ summary: 'Create an Employee' })
  @ApiBearerAuth() // Specify that this endpoint requires Bearer Authentication
  @UseGuards(AccessTokenGuard) // Apply guards
  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiOperation({ summary: 'Employee Sign Out' })
  @ApiBearerAuth()
  @UseGuards(UserGuard)
  @Post('signOut')
  async signOut(@Res({ passthrough: true }) res: Response) {
    return this.employeeService.signOut(res);
  }

  @ApiOperation({ summary: 'Get all Employees' })
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiOperation({ summary: 'Get an Employee by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update an Employee by ID' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeeService.update(+id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete an Employee by ID' })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(+id);
  }
}
