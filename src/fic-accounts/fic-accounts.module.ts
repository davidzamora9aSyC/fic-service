import { Module } from '@nestjs/common';
import { FicAccountsController } from './fic-accounts.controller';
import { FicAccountsService } from './fic-accounts.service';

@Module({
  controllers: [FicAccountsController],
  providers: [FicAccountsService],
  exports: [FicAccountsService],
})
export class FicAccountsModule {}
