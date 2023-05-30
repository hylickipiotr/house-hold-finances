import { Inject, Service } from 'typedi';
import { Transaction } from '@prisma/client';
import { NotFoundError } from 'routing-controllers';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';

@Service()
export default class TransactionsService {
  @Inject()
  private readonly transactionsRepository!: TransactionsRepository;

  public async getAll(): Promise<Transaction[]> {
    return this.transactionsRepository.getAll();
  }

  public async getById(id: number): Promise<Transaction | null> {
    const transaction = await this.transactionsRepository.getById(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return transaction;
  }

  public async create(
    transaction: CreateTransactionDto,
    userId: string
  ): Promise<Transaction> {
    return this.transactionsRepository.create(transaction, userId);
  }

  public async update(
    id: number,
    transaction: UpdateTransactionDto,
    userId: string
  ): Promise<Transaction | null> {
    const updatedTransaction = await this.transactionsRepository.update(
      id,
      transaction,
      userId
    );

    if (!updatedTransaction) {
      throw new NotFoundError('Transaction not found');
    }

    return updatedTransaction;
  }

  public async delete(id: number): Promise<boolean | null> {
    const transaction = this.transactionsRepository.delete(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return true;
  }
}
