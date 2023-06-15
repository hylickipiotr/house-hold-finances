import {
  Authorized,
  Get,
  JsonController,
  QueryParams,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { StatsDto } from '../dtos/StatsDto';
import StatsService from '../services/StatsService';
import { ResponseWithData } from '../utils/types';

interface StatsMonthlyQuery {
  year: number;
  month: number;
}

@JsonController('/stats')
@Service()
export default class StatsController {
  @Inject()
  private readonly statsService!: StatsService;

  @Authorized()
  @Get('/')
  public async getStats(
    @QueryParams() query: StatsMonthlyQuery
  ): Promise<ResponseWithData<StatsDto>> {
    const year = query.year ?? new Date().getFullYear();
    const month = query.month ?? new Date().getMonth() + 1;

    const data = await this.statsService.getStats(year, month);
    return { data };
  }
}
