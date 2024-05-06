import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { AccessTokenGuard } from '../common/guards';
import {
  ApiTags,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiParam,
} from '@nestjs/swagger'; // Import Swagger decorators

@ApiTags('Table') // Specify the Swagger tag for this controller
@Controller('table')
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @ApiBearerAuth() // Specify that Bearer authentication is required for this endpoint
  @ApiCreatedResponse({ description: 'Table created successfully' })
  // @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createTableDto: CreateTableDto) {
    return this.tableService.create(createTableDto);
  }

  @ApiOkResponse({ description: 'List of all tables' })
  @Get()
  findAll() {
    return this.tableService.findAll();
  }

  @ApiOkResponse({ description: 'Table found' })
  @ApiNotFoundResponse({ description: 'Table not found' })
  @ApiParam({ name: 'id', description: 'Table ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tableService.findOne(+id);
  }

  @ApiBearerAuth() // Specify that Bearer authentication is required for this endpoint
  @ApiOkResponse({ description: 'Table updated successfully' })
  @ApiNotFoundResponse({ description: 'Table not found' })
  @ApiParam({ name: 'id', description: 'Table ID' })
  // @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTableDto: UpdateTableDto) {
    return this.tableService.update(+id, updateTableDto);
  }

  @ApiBearerAuth() // Specify that Bearer authentication is required for this endpoint
  @ApiOkResponse({ description: 'Table deleted successfully' })
  @ApiNotFoundResponse({ description: 'Table not found' })
  @ApiParam({ name: 'id', description: 'Table ID' })
  // @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tableService.remove(+id);
  }
}
