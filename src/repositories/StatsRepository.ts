import { PrismaClient } from '@prisma/client';
import { Inject, Service } from 'typedi';
import dayjs from 'dayjs';

@Service()
export default class StatsRepository {
  @Inject('prisma')
  private readonly prisma!: PrismaClient;

  public async stats(year: number, month: number) {
    const gte = dayjs()
      .set('date', 1)
      .set('month', month - 1)
      .set('year', year)
      .set('hour', 0)
      .set('minute', 0)
      .set('second', 0)
      .set('millisecond', 0)
      .toDate();

    const lt = dayjs(gte).add(1, 'month').toDate();

    return this.prisma.transaction.groupBy({
      by: ['type'],
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte,
          lt,
        },
      },
    });
  }
}
