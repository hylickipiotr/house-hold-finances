import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import EmcSearchJobsService from '../../services/emc/EmcSearchJobsService';
import { EmcSearchJobDTO } from '../../dtos/emc/EmcSearchJobDto';
import EmcCreateSearchJobDTO from '../../dtos/emc/EmcCreateSearchJobDto';
import EmcUpdateSearchJobDTO from '../../dtos/emc/EmcUpdateSearchJobDto';

@JsonController('/emc/search-jobs')
@Service()
export default class EmcSearchJobsController {
  @Inject()
  private readonly searchJobsService!: EmcSearchJobsService;

  @Authorized()
  @Get('/')
  public async getSearchJobs(): Promise<EmcSearchJobDTO[]> {
    return this.searchJobsService.getSearchJobs();
  }

  @Authorized()
  @Get('/:id')
  public async getSearchJobById(id: number): Promise<EmcSearchJobDTO | null> {
    return this.searchJobsService.getSearchJobById(id);
  }

  @Authorized()
  @Post('/')
  public async createSearchJob(
    @Body() data: EmcCreateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    return this.searchJobsService.createSearchJob(data);
  }

  @Authorized()
  @Put('/:id')
  public async updateSearchJob(
    @Param('id') id: number,
    @Body() data: EmcUpdateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    return this.searchJobsService.updateSearchJob(id, data);
  }

  @Authorized()
  @Delete('/:id')
  public async deleteSearchJob(
    @Param('id') id: number
  ): Promise<EmcSearchJobDTO> {
    return this.searchJobsService.deleteSearchJob(id);
  }
}
