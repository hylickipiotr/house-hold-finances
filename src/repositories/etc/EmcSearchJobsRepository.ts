import {
  EmcSearchJob,
  EmcSearchJobRunStatus,
  EmcSearchJobStatus,
  PrismaClient,
} from '@prisma/client';
import { Inject, Service } from 'typedi';
import EmcCreateSearchJobDTO from '../../dtos/emc/EmcCreateSearchJobDto';
import EmcUpdateSearchJobDTO from '../../dtos/emc/EmcUpdateSearchJobDto';
import { EmcSearchJobDTO } from '../../dtos/emc/EmcSearchJobDto';

@Service()
export default class EmcSearchJobsRepository {
  @Inject('prisma')
  private readonly prisma!: PrismaClient;

  public async getSearchJobs(): Promise<EmcSearchJobDTO[]> {
    return (await this.prisma.emcSearchJob.findMany()).map(
      EmcSearchJobsRepository.mapToDTO
    );
  }

  public async getSearchJobById(id: number): Promise<EmcSearchJobDTO | null> {
    const searchJob = await this.prisma.emcSearchJob.findUnique({
      where: {
        id,
      },
    });
    if (!searchJob) {
      return null;
    }

    return EmcSearchJobsRepository.mapToDTO(searchJob);
  }

  public async createSearchJob(
    data: EmcCreateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    const searchJob = await this.prisma.emcSearchJob.create({
      data: {
        data: JSON.stringify(data.data),
        status: EmcSearchJobStatus.ENABLED,
      },
    });

    return EmcSearchJobsRepository.mapToDTO(searchJob);
  }

  public async updateSearchJob(
    id: number,
    data: EmcUpdateSearchJobDTO
  ): Promise<EmcSearchJobDTO> {
    const searchJob = await this.prisma.emcSearchJob.update({
      where: {
        id,
      },
      data: {
        data: data.data && JSON.stringify(data.data),
        status: data.status,
      },
    });

    return EmcSearchJobsRepository.mapToDTO(searchJob);
  }

  public async deleteSearchJob(id: number): Promise<EmcSearchJobDTO> {
    const searchJob = await this.prisma.emcSearchJob.delete({
      where: {
        id,
      },
    });

    return EmcSearchJobsRepository.mapToDTO(searchJob);
  }

  private static mapToDTO(data: EmcSearchJob): EmcSearchJobDTO {
    return {
      ...data,
      data: JSON.parse(data.data.toString()),
    };
  }
}
