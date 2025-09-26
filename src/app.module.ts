import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { FicFundsModule } from './fic-funds/fic-funds.module';
import { FicOrdersModule } from './fic-orders/fic-orders.module';
import { FicAccountsModule } from './fic-accounts/fic-accounts.module';
import { FicTransactionsModule } from './fic-transactions/fic-transactions.module';
import { FicRiskModule } from './fic-risk/fic-risk.module';

@Module({
  imports: [PrismaModule, FicFundsModule, FicOrdersModule, FicAccountsModule, FicTransactionsModule, FicRiskModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
