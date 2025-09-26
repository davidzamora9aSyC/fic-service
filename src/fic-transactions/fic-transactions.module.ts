import { Module } from '@nestjs/common';
import { FicTransactionsController } from './fic-transactions.controller';
import { FicTransactionsService } from './fic-transactions.service';

@Module({
  controllers: [FicTransactionsController],
  providers: [FicTransactionsService],
  exports: [FicTransactionsService],
})
export class FicTransactionsModule {}
