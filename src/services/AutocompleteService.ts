import { Inject, Service } from 'typedi';
import TransactionsRepository from '../repositories/TransactionsRepository';

@Service()
export default class AutocompleteService {
  @Inject()
  private readonly transactionsRepository!: TransactionsRepository;

  public async autocompleteTransactionsTitle(query: string): Promise<string[]> {
    const titleQuery = query
      .trim()
      .split(' ')
      .filter(Boolean)
      .map((word) => `${word}*`)
      .join(' ');

    return this.transactionsRepository.searchTitles(titleQuery);
  }
}
