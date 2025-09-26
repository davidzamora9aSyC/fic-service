import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FicRiskService } from './fic-risk.service';
import { CreateRiskProfileDto } from './dto/create-risk-profile.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ListRiskProfileDto } from './dto/list-risk-profile.dto';

@Controller('fic/risk-profiles')
export class FicRiskController {
  constructor(private readonly service: FicRiskService) {}

  @Post()
  create(@Body() dto: CreateRiskProfileDto) {
    return this.service.create(dto);
  }

  @Get()
  list(
    @Query() pagination: PaginationQueryDto,
    @Query() filters: ListRiskProfileDto,
  ) {
    return this.service.list(pagination, filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}
