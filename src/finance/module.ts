import { Module } from '@nestjs/common';
import { TransactionController } from './controller/transactionController';
import { TransactionService } from './service/transactionService';
import { TransactionSchema } from './schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class FinanceModule {}
