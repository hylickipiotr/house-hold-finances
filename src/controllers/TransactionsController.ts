import { TransactionType } from '@prisma/client';
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
  QueryParam,
  Req,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';
import TransactionsService from '../services/TransactionsService';
import { ResponseWithData, User } from '../utils/types';

@JsonController('/transactions')
@Service()
export default class TransactionsController {
  @Inject()
  private readonly transactionsService!: TransactionsService;

  @Authorized()
  @Get('/')
  public async getAll(
    @QueryParam('month', { type: Number }) month?: number,
    @QueryParam('year', { type: Number }) year?: number,
    @QueryParam('type') type?: TransactionType
  ): Promise<ResponseWithData<TransactionDto[]>> {
    const data = await this.transactionsService.getAll({ month, year, type });
    return { data };
  }

  @Authorized()
  @Get('/:id')
  public async getById(
    @CurrentUser() currentUser: User,
    @Req() req: Request
  ): Promise<ResponseWithData<TransactionDto | null>> {
    const data = await this.transactionsService.getById(Number(req.params.id));
    return { data };
  }

  @Authorized()
  @Post('/')
  public async create(
    @CurrentUser() currentUser: User,
    @Body() transaction: CreateTransactionDto
  ): Promise<ResponseWithData<TransactionDto>> {
    const data = await this.transactionsService.create(
      transaction,
      currentUser.sub
    );
    return { data };
  }

  @Authorized()
  @Put('/:id')
  public async update(
    @CurrentUser() currentUser: User,
    @Req() req: Request<{ id: number }>,
    @Body() transaction: UpdateTransactionDto
  ): Promise<ResponseWithData<TransactionDto | null>> {
    const data = await this.transactionsService.update(
      Number(req.params.id),
      transaction,
      currentUser.sub
    );
    return { data };
  }

  @Authorized()
  @Delete('/:id')
  public async delete(
    @Req() req: Request<{ id: number }>
  ): Promise<ResponseWithData<boolean>> {
    const data = await this.transactionsService.delete(Number(req.params.id));
    return { data };
  }

  @Authorized()
  @Post('/batch')
  public async createMany(
    @CurrentUser() currentUser: User,
    @Body() transactions: CreateTransactionDto[]
  ): Promise<ResponseWithData<TransactionDto[]>> {
    const data = await this.transactionsService.createMany(
      transactions,
      currentUser.sub
    );
    return { data };
  }

  @Authorized()
  @Put('/batch')
  public async updateMany(
    @CurrentUser() currentUser: User,
    @Body() transactions: UpdateTransactionDto[]
  ): Promise<ResponseWithData<TransactionDto[]>> {
    const data = await this.transactionsService.updateMany(
      transactions,
      currentUser.sub
    );
    return { data };
  }

  @Authorized()
  @Delete('/batch')
  public async deleteMany(
    @Body() ids: number[]
  ): Promise<ResponseWithData<boolean[]>> {
    const data = await this.transactionsService.deleteMany(ids);
    return { data };
  }
}
