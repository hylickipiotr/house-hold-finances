import { TransactionType } from '@prisma/client';
import {
  Authorized,
  Body,
  CurrentUser,
  JsonController,
  Post,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import { TransactionDto } from '../dtos/TransactionDto';
import ImportService from '../services/ImportService';
import { ResponseWithData, User } from '../utils/types';

interface ImportFromSpreadsheetBody {
  raw: string;
  type: TransactionType;
  date: string;
}

@JsonController('/import')
@Service()
export default class ImportController {
  @Inject()
  private readonly importService!: ImportService;

  @Authorized()
  @Post('/spreadsheet')
  public async importFromSpreadsheet(
    @CurrentUser() currentUser: User,
    @Body() body: ImportFromSpreadsheetBody
  ): Promise<ResponseWithData<TransactionDto[]>> {
    const data = await this.importService.importFromSpreadsheet(
      body,
      currentUser.sub
    );
    return { data };
  }
}
