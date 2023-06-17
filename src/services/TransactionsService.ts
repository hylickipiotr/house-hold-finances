import { TransactionType } from '@prisma/client';
import { InternalServerError, NotFoundError } from 'routing-controllers';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';
import TransactionsRepository from '../repositories/TransactionsRepository';
import { mapTransactionToDto } from '../utils/mappers/transactions';

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
    return transactions.map(mapTransactionToDto);
  }

  public async getById(id: number): Promise<TransactionDto | null> {
    const transaction = await this.transactionsRepository.getById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return mapTransactionToDto(transaction);
  }

  public async create(
    transaction: CreateTransactionDto,
    userId: string
  ): Promise<TransactionDto> {
    const createdTransaction = await this.transactionsRepository.create(
      transaction,
      userId
    );

    return mapTransactionToDto(createdTransaction);
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

      return mapTransactionToDto(updatedTransaction);
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

  public async createMany(
    transactions: CreateTransactionDto[],
    userId: string
  ): Promise<TransactionDto[]> {
    const createdTransactions = await this.transactionsRepository.createMany(
      transactions,
      userId
    );

    return createdTransactions.map(mapTransactionToDto);
  }

  public async updateMany(
    transactions: UpdateTransactionDto[],
    userId: string
  ): Promise<TransactionDto[]> {
    const updatedTransactions = await this.transactionsRepository.updateMany(
      transactions,
      userId
    );

    return updatedTransactions.map(mapTransactionToDto);
  }

  public async deleteMany(ids: number[]): Promise<boolean[]> {
    const transactions = await this.transactionsRepository.deleteMany(ids);

    return transactions.map(Boolean);
  }
}
