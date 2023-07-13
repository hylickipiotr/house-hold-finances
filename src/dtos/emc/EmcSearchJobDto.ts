import { EmcSearchJobStatus } from '@prisma/client';

export interface EmcSearchJobDTO {
  id: number;
  data: JSON;
  status: EmcSearchJobStatus;
  createdAt: Date;
  updatedAt: Date;
}
