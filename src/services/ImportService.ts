import { TransactionType } from '@prisma/client';
import { Inject, Service } from 'typedi';
import CreateTransactionDto from '../dtos/CreateTransactionDto';
import { TransactionDto } from '../dtos/TransactionDto';
import TransactionsRepository from '../repositories/TransactionsRepository';
import SpreadsheetParser from '../utils/helpers/SpreadsheetParser';
import { mapTransactionToDto } from '../utils/mappers/transactions';

interface ImportFromSpreadsheetData {
  raw: string;
  type: TransactionType;
  date: string;
}

@Service()
export default class ImportService {
  @Inject()
  private readonly transactionsRepository!: TransactionsRepository;

  public async importFromSpreadsheet(
    { raw, date, type }: ImportFromSpreadsheetData,
    userId: string
  ): Promise<TransactionDto[]> {
    const transactions = SpreadsheetParser.parseTransactions(raw);

    if (transactions.length === 0) {
      throw new Error('No transactions found');
    }

    const transactionsToCreate: CreateTransactionDto[] = transactions.map(
      (transaction) => ({
        ...transaction,
        type,
        date,
        description: '',
      })
    );

    const createdTransactions = await this.transactionsRepository.createMany(
      transactionsToCreate,
      userId
    );

    return createdTransactions.map(mapTransactionToDto);
  }
}
