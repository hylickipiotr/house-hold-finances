/* eslint-disable import/prefer-default-export */
import { Transaction } from '@prisma/client';
import { TransactionDto } from '../../dtos/TransactionDto';

export const mapTransactionToDto = (
  transaction: Transaction
): TransactionDto => {
  return {
    id: transaction.id,
    title: transaction.title,
    date: transaction.date,
    type: transaction.type,
    description: transaction.description,
    amount: transaction.amount.toNumber(),
    createdAt: transaction.createdAt,
    updatedAt: transaction.updatedAt,
  };
};
