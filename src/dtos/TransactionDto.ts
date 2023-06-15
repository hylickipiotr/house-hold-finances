import { TransactionType } from '@prisma/client';

export interface TransactionDto {
  id: number;
  title: string;
  date: Date;
  type: TransactionType;
  description?: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
