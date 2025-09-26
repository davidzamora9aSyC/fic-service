import { Module } from '@nestjs/common';
import { FicFundsController } from './fic-funds.controller';
import { FicFundsService } from './fic-funds.service';

@Module({
  controllers: [FicFundsController],
  providers: [FicFundsService],
  exports: [FicFundsService],
})
export class FicFundsModule {}
