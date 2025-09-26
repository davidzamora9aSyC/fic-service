import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { FicFundsService } from './fic-funds.service';
import { ListFicFundsDto } from './dto/list-fic-funds.dto';

@Controller('fic/funds')
export class FicFundsController {
  constructor(private readonly service: FicFundsService) {}

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListFicFundsDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
