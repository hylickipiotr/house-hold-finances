import { EmcSearchJobStatus } from '@prisma/client';
import { IsEnum, IsObject, IsOptional } from 'class-validator';

export default class EmcUpdateSearchJobDTO {
  @IsObject()
  @IsOptional()
  data?: JSON;

  @IsEnum(EmcSearchJobStatus)
  @IsOptional()
  status: EmcSearchJobStatus;
}
