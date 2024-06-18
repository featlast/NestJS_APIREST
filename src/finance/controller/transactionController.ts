import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  HttpStatus,
  Res,
  Delete,
  Query,
  NotFoundException,
  Param,
  Logger,
} from '@nestjs/common';
import { TransactionService } from '../service/transactionService';
import { CreateTransactionDto } from '../DTO/transactionDto';

@Controller('finance/transactions/v1')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(private readonly transactionService: TransactionService) {}

  @Post('deposit')
  createTransaction(
    @Body() createTransactionDto: CreateTransactionDto,
    @Request() req: any,
  ) {
    this.logger.log(`Deposit endpoint called`);
    return this.transactionService.createTransaction(
      createTransactionDto,
      req.userInformation.id,
    );
  }

  @Post('withdraw')
  withdrawTransaction(
    @Body() withdrawTransactionDto: CreateTransactionDto,
    @Request() req: any,
  ) {
    this.logger.log(`Withdraw endpoint called`);
    return this.transactionService.withdrawTransaction(
      withdrawTransactionDto,
      req.userInformation.id,
    );
  }

  @Get('balance')
  getAccountBalance(@Request() req: any) {
    this.logger.log(`Balance endpoint called`);
    return this.transactionService.getAccountBalance(req.userInformation.id);
  }

  @Get('movements')
  getUsersApp(@Request() req: any) {
    this.logger.log(`All Movements endpoint called`);
    return this.transactionService.getAllData();
  }

  @Delete('delete')
async deleteById(@Res() res:any,@Query('id') id: string): Promise<void| null> {
  const productDeleted = await this.transactionService.deleteById(id);
  this.logger.log(`Delete endpoint called,${id}`);
  console.log('first', productDeleted)
  if (!productDeleted) throw new NotFoundException('Product does not exist!');
  return res.status(HttpStatus.OK).json({
    message: 'Product Deleted Successfully',
    productDeleted
});
}

}
