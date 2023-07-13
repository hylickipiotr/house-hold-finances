import { Inject, Service } from 'typedi';
import EmcCreateSearchJobDTO from '../../dtos/emc/EmcCreateSearchJobDto';
import { EmcSearchJobDTO } from '../../dtos/emc/EmcSearchJobDto';
import EmcUpdateSearchJobDTO from '../../dtos/emc/EmcUpdateSearchJobDto';
import EmcSearchJobsRepository from '../../repositories/etc/EmcSearchJobsRepository';

@Service()
export default class EmcSearchJobsService {
  @Inject()
  private readonly searchJobsRepository!: EmcSearchJobsRepository;

  public async getSearchJobs(): Promise<EmcSearchJobDTO[]> {
    return this.searchJobsRepository.getSearchJobs();
  }

  public async getSearchJobById(id: number): Promise<EmcSearchJobDTO | null> {
    return this.searchJobsRepository.getSearchJobById(id);
  }

  public async createSearchJob(
    data: EmcCreateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    return this.searchJobsRepository.createSearchJob(data);
  }

  public async updateSearchJob(
    id: number,
    data: EmcUpdateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    return this.searchJobsRepository.updateSearchJob(id, data);
  }

  public async deleteSearchJob(id: number): Promise<EmcSearchJobDTO> {
    return this.searchJobsRepository.deleteSearchJob(id);
  }
}
