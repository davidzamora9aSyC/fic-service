import { Module } from '@nestjs/common';
import { FicRiskController } from './fic-risk.controller';
import { FicRiskService } from './fic-risk.service';

@Module({
  controllers: [FicRiskController],
  providers: [FicRiskService],
  exports: [FicRiskService],
})
export class FicRiskModule {}
