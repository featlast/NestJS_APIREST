import { IsNotEmpty, IsNumber, IsEnum, IsOptional } from 'class-validator';
import { TransactionType } from '../schema';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;

  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  userId?: string;
}
