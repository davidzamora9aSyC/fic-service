import { Module } from '@nestjs/common';
import { FicOrdersController } from './fic-orders.controller';
import { FicOrdersService } from './fic-orders.service';

@Module({
  controllers: [FicOrdersController],
  providers: [FicOrdersService],
  exports: [FicOrdersService],
})
export class FicOrdersModule {}
