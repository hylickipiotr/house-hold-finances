import { PrismaClient, Transaction } from '@prisma/client';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';

@Service()
export default class TransactionsRepository {
  @Inject('prisma')
  private readonly prisma!: PrismaClient;

  public async getAll(): Promise<Transaction[]> {
    return this.prisma.transaction.findMany();
  }

  public async getById(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.findUnique({
      where: { id },
    });
  }

  public async create(
    transaction: CreateTransactionDto,
    userId: string
  ): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        ...transaction,
        date: new Date(transaction.date),
        createdBy: userId,
        updatedBy: userId,
      },
    });
  }

  public async update(
    id: number,
    transaction: UpdateTransactionDto,
    userId: string
  ): Promise<Transaction | null> {
    return this.prisma.transaction.update({
      where: { id },
      data: {
        ...transaction,
        updatedBy: userId,
      },
    });
  }

  public async delete(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }
}
