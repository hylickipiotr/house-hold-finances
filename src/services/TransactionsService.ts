import { Inject, Service } from 'typedi';
import { Transaction, TransactionType } from '@prisma/client';
import { InternalServerError, NotFoundError } from 'routing-controllers';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';
import { StatsDto } from '../dtos/StatsDto';

const formatTransaction = (transaction: Transaction): TransactionDto => {
  return {
    id: transaction.id,
    title: transaction.title,
    date: transaction.date,
    type: transaction.type,
    description: transaction.description,
    amount: transaction.amount.toNumber(),
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};

@Service()
export default class TransactionsService {
  @Inject()
  private readonly transactionsRepository!: TransactionsRepository;

  public async getAll({
    year,
    month,
    type,
  }: {
    year?: number;
    month?: number;
    type?: TransactionType;
  }): Promise<TransactionDto[]> {
    const transactions = await this.transactionsRepository.getAll({
      year,
      month,
      type,
    });
    return transactions.map(formatTransaction);
  }

  public async getById(id: number): Promise<TransactionDto | null> {
    const transaction = await this.transactionsRepository.getById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return formatTransaction(transaction);
  }

  public async create(
    transaction: CreateTransactionDto,
    userId: string
  ): Promise<TransactionDto> {
    const createdTransaction = await this.transactionsRepository.create(
      transaction,
      userId
    );

    return formatTransaction(createdTransaction);
  }

  public async update(
    id: number,
    transaction: UpdateTransactionDto,
    userId: string
  ): Promise<TransactionDto | null> {
    try {
      const updatedTransaction = await this.transactionsRepository.update(
        id,
        transaction,
        userId
      );

      if (!updatedTransaction) {
        throw new NotFoundError('Transaction not found');
      }

      return formatTransaction(updatedTransaction);
    } catch (e) {
      throw new InternalServerError(e.message);
    }
  }

  public async delete(id: number): Promise<boolean | null> {
    const transaction = this.transactionsRepository.delete(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return true;
  }
}
