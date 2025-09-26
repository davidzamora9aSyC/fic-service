import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FicOrdersService } from './fic-orders.service';
import { CreateFicOrderDto } from './dto/create-fic-order.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicOrdersDto } from './dto/list-fic-orders.dto';
import { UpdateFicOrderStatusDto } from './dto/update-fic-order-status.dto';

@Controller('fic/orders')
export class FicOrdersController {
  constructor(private readonly service: FicOrdersService) {}

  @Post()
  create(@Body() dto: CreateFicOrderDto) {
    return this.service.create(dto);
  }

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListFicOrdersDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  updateEstado(@Param('id') id: string, @Body() dto: UpdateFicOrderStatusDto) {
    return this.service.updateEstado(id, dto);
  }
}
