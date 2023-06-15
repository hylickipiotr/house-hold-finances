import { TransactionType } from '@prisma/client';
import { Inject, Service } from 'typedi';
import { StatsDto } from '../dtos/StatsDto';
import StatsRepository from '../repositories/StatsRepository';

@Service()
export default class StatsService {
  @Inject()
  private readonly statsRepository!: StatsRepository;

  public async getStats(year: number, month: number): Promise<StatsDto> {
    const stats = await this.statsRepository.stats(year, month);

    const income =
      stats
        .find((stat) => stat.type === TransactionType.INCOME)
        ?._sum.amount.toNumber() ?? 0;

    const expense =
      stats
        .find((stat) => stat.type === TransactionType.EXPENSE)
        ?._sum.amount.toNumber() ?? 0;

    return {
      income,
      expense,
      balance: income - expense,
    };
  }
}
