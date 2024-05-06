import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Role') // Specify the Swagger tag for this controller
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiCreatedResponse({ description: 'Role created successfully' })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOkResponse({ description: 'List of all roles' })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOkResponse({ description: 'Role found' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOkResponse({ description: 'Role updated successfully' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @ApiOkResponse({ description: 'Role deleted successfully' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
