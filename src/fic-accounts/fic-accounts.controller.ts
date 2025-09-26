import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FicAccountsService } from './fic-accounts.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicAccountsDto } from './dto/list-fic-accounts.dto';
import { CreateFicAccountDto } from './dto/create-fic-account.dto';

@Controller('fic/accounts')
export class FicAccountsController {
  constructor(private readonly service: FicAccountsService) {}

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListFicAccountsDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateFicAccountDto) {
    return this.service.create(dto);
  }
}
