import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { FinanceModule } from './finance/module';
import { MongooseModule } from '@nestjs/mongoose';
import { MyLoggerService } from './exceptionFilter';

@Module({
  providers: [MyLoggerService],
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ikualo'),
    UserModule,
    FinanceModule,
  ],
})
export class AppModule {}
