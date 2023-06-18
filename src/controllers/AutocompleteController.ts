import {
  Authorized,
  Get,
  JsonController,
  QueryParam,
} from 'routing-controllers';
import { Inject, Service } from 'typedi';
import AutocompleteService from '../services/AutocompleteService';
import { ResponseWithData } from '../utils/types';

@JsonController('/autocomplete')
@Service()
export default class AutocompleteController {
  @Inject()
  private readonly autocompleteService!: AutocompleteService;

  @Authorized()
  @Get('/transactions')
  public async autocompleteTransactions(
    @QueryParam('query') query: string
  ): Promise<ResponseWithData<string[]>> {
    const data = await this.autocompleteService.autocompleteTransactionsTitle(
      query || ''
    );
    return { data };
  }
}
