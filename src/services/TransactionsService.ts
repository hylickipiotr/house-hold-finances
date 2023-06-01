import { Inject, Service } from 'typedi';
import { Transaction } from '@prisma/client';
import { NotFoundError } from 'routing-controllers';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';

const formatTransaction = (transaction: Transaction): TransactionDto => {
  return {
    id: transaction.id,
    date: transaction.date,
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

  public async getAll(): Promise<TransactionDto[]> {
    const transactions = await this.transactionsRepository.getAll();
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
    const updatedTransaction = await this.transactionsRepository.update(
      id,
      transaction,
      userId
    );

    if (!updatedTransaction) {
      throw new NotFoundError('Transaction not found');
    }

    return formatTransaction(updatedTransaction);
  }

  public async delete(id: number): Promise<boolean | null> {
    const transaction = this.transactionsRepository.delete(id);

    if (!transaction) {
      throw new NotFoundError('Transaction not found');
    }

    return true;
  }
}
