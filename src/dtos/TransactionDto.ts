export interface TransactionDto {
  id: number;
  date: Date;
  description?: string;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}
