import { PrismaClient, Transaction, TransactionType } from '@prisma/client';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import UpdateTransactionDto from '../dtos/UpdateTransactionDto';

@Service()
export default class TransactionsRepository {
  @Inject('prisma')
  private readonly prisma!: PrismaClient;

  public async getAll({
    year,
    month,
    type,
  }: {
    year?: number;
    month?: number;
    type?: TransactionType;
  } = {}): Promise<Transaction[]> {
    return this.prisma.transaction.findMany({
      orderBy: {
        date: 'desc',
      },
      where: {
        AND: [
          typeof year === 'number' && typeof month === 'number'
            ? {
                date: {
                  gte: new Date(`${year ?? 0}-${month ?? 0}-01`),
                  lt: new Date(
                    `${month === 12 ? year + 1 : year}-${
                      month === 12 ? 1 : month + 1
                    }-01`
                  ),
                },
              }
            : {},
          type ? { type } : {},
        ],
      },
    });
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
        date: new Date(transaction.date),
        updatedBy: userId,
      },
    });
  }

  public async delete(id: number): Promise<Transaction | null> {
    return this.prisma.transaction.delete({
      where: { id },
    });
  }

  public async createMany(
    transactions: CreateTransactionDto[],
    userId: string
  ) {
    return this.prisma.$transaction(
      transactions.map((transaction) =>
        this.prisma.transaction.create({
          data: {
            ...transaction,
            date: new Date(transaction.date),
            createdBy: userId,
            updatedBy: userId,
          },
        })
      )
    );
  }

  public async updateMany(
    transactions: UpdateTransactionDto[],
    userId: string
  ) {
    return this.prisma.$transaction(
      transactions.map((transaction) =>
        this.prisma.transaction.update({
          where: { id: transaction.id },
          data: {
            ...transaction,
            updatedBy: userId,
          },
        })
      )
    );
  }

  public async deleteMany(ids: number[]) {
    return this.prisma.$transaction(
      ids.map((id) =>
        this.prisma.transaction.delete({
          where: { id },
        })
      )
    );
  }
}
