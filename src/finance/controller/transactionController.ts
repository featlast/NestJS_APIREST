import { Controller, Post, Body, Get, Request, HttpStatus, Res, Delete, Query, NotFoundException, Param,  Logger } from '@nestjs/common';
import { TransactionService } from '../service/transactionService';
import { CreateTransactionDto } from '../DTO/transactionDto';

@Controller('finance/transactions/v1')
export class TransactionController {
  private readonly logger = new Logger(TransactionController.name);
  constructor(
    private readonly transactionService: TransactionService) {}

  @Post('deposit')
  createTransaction(@Body() createTransactionDto: CreateTransactionDto, @Request() req: any) {
    this.logger.log(`Deposit endpoint called`);
    return this.transactionService.createTransaction(
      createTransactionDto, 
      req.userInformation.id);
  }

  @Post('withdraw')
  withdrawTransaction(@Body() withdrawTransactionDto: CreateTransactionDto, @Request() req: any) {
    this.logger.log(`Withdraw endpoint called`);
    return this.transactionService.withdrawTransaction(
      withdrawTransactionDto, 
      req.userInformation.id);
  }

  @Get('balance')
  getAccountBalance(@Request() req: any) {
    this.logger.log(`Balance endpoint called`);
    return this.transactionService.getAccountBalance(req.userInformation.id);
  }


  @Get('movements')
  getUsersApp(@Request()req:any){
    this.logger.log(`All Movements endpoint called`);
    return this.transactionService.getAllData()
  }

  @Delete('delete')
  async deleteMovements(@Request() req:any, @Query('productID') productID:string) {
      const productDeleted = await this.transactionService.deleteMovement(productID);
      this.logger.log(`Delete endpoint called,${productID}`);
      if (!productDeleted) throw new NotFoundException('Movement does not exist!');
      return req.status(HttpStatus.OK).json({
          message: 'Movement Deleted Successfully',
          productDeleted
      });
  }


}
