import { Request } from 'express';
import {
  Authorized,
  Body,
  CurrentUser,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  Req,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';
import TransactionsService from '../services/TransactionsService';
import { User } from '../utils/types';

@JsonController('/transactions')
@Service()
export default class TransactionsController {
  @Inject()
  private readonly transactionsService!: TransactionsService;

  @Authorized()
  @Get('/')
  public async getAll(): Promise<TransactionDto[]> {
    return this.transactionsService.getAll();
  }

  @Authorized()
  @Get('/:id')
  public async getById(
    @CurrentUser() currentUser: User,
    @Req() req: Request
  ): Promise<TransactionDto | null> {
    return this.transactionsService.getById(Number(req.params.id));
  }

  @Authorized()
  @Post('/')
  public async create(
    @CurrentUser() currentUser: User,
    @Body() transaction: CreateTransactionDto
  ): Promise<TransactionDto> {
    return this.transactionsService.create(transaction, currentUser.sub);
  }

  @Authorized()
  @Put('/:id')
  public async update(
    @CurrentUser() currentUser: User,
    @Req() req: Request<{ id: number }>,
    @Body() transaction: UpdateTransactionDto
  ): Promise<TransactionDto | null> {
    return this.transactionsService.update(
      Number(req.params.id),
      transaction,
      currentUser.sub
    );
  }

  @Authorized()
  @Delete('/:id')
  public async delete(@Req() req: Request<{ id: number }>): Promise<boolean> {
    return this.transactionsService.delete(Number(req.params.id));
  }
}
