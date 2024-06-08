import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument, TransactionType  } from '../schema';
import { CreateTransactionDto } from '../DTO/transactionDto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async createTransaction(createTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    createTransactionDto.type = TransactionType.DEPOSIT;
    createTransactionDto.userId = userId;

    const createdTransaction = new this.transactionModel(createTransactionDto);
    return createdTransaction.save();
  }

  async withdrawTransaction(withdrawTransactionDto: CreateTransactionDto, userId: string): Promise<Transaction> {
    withdrawTransactionDto.type = TransactionType.WITHDRAWAL;

    const currentBalance = await this.getAccountBalance(userId);
  
    if (withdrawTransactionDto.amount > currentBalance) {
      throw new HttpException(
          "Fondos insuficientes. No se puede realizar el retiro.", 
          HttpStatus.BAD_REQUEST);
    }
    
    //* Se guarda negativamente en base de datos
    const negativeAmountDto: CreateTransactionDto = {
        ...withdrawTransactionDto,
        amount: -Math.abs(withdrawTransactionDto.amount),
        userId
    };
    const createdTransaction = new this.transactionModel(negativeAmountDto);

    return createdTransaction.save();
  }

  async getAccountBalance(userId: string): Promise<number> {
    const userTransactions = await this.transactionModel.find({ userId });

    const currentBalance = userTransactions.reduce((balance, transaction) => {
        return transaction.amount + balance;
      }, 0);

    return currentBalance;
  }

  //Get all Movements
  async getAllData():Promise<any[]>{
    const allData = await this.transactionModel.find()
    return allData;
  }

      // Delete Movement
      async deleteMovement(id: string): Promise<any> {
        const deletedProduct = await this.transactionModel.findOneAndDelete({_id:id});
        return deletedProduct;
    }


}
