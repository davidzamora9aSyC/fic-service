import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FicTransactionsService } from './fic-transactions.service';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListFicTransactionsDto } from './dto/list-fic-transactions.dto';
import { CreateFicTransactionDto } from './dto/create-fic-transaction.dto';

@Controller('fic/accounts/:accountId/transactions')
export class FicTransactionsController {
  constructor(private readonly service: FicTransactionsService) {}

  @Get()
  list(
    @Param('accountId') accountId: string,
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListFicTransactionsDto,
  ) {
    return this.service.listByAccount(accountId, pagination, filters);
  }

  @Post()
  create(@Param('accountId') accountId: string, @Body() dto: CreateFicTransactionDto) {
    return this.service.create({ ...dto, cuentaId: accountId });
  }
}
