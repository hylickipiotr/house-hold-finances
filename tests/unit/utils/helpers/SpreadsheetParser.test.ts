import { describe, expect, it } from 'vitest';
import SpreadsheetParser from '../../../../src/utils/helpers/SpreadsheetParser';

describe('SpreadsheetParser', () => {
  it('should parse transaction', () => {
    const raw = 'title\t1 000,00 zł';
    const expected = {
      title: 'title',
      amount: 1000,
    };

    const result = SpreadsheetParser.parseTransaction(raw);

    expect(result).toEqual(expected);
  });

  it('should parse transactions', () => {
    const raw = 'title\t1 000,00 zł\ntitle2\t2 000,00 zł';
    const expected = [
      {
        title: 'title',
        amount: 1000,
      },
      {
        title: 'title2',
        amount: 2000,
      },
    ];

    const result = SpreadsheetParser.parseTransactions(raw);

    expect(result).toEqual(expected);
  });

  it('should parse transactions with empty lines', () => {
    const raw = 'title\t1 000,00 zł\n\ntitle2\t2 000,00 zł';
    const expected = [
      {
        title: 'title',
        amount: 1000,
      },
      {
        title: 'title2',
        amount: 2000,
      },
    ];

    const result = SpreadsheetParser.parseTransactions(raw);

    expect(result).toEqual(expected);
  });

  it('should parse transactions with empty lines at the end', () => {
    const raw = 'title\t1 000,00 zł\ntitle2\t2 000,00 zł\n';
    const expected = [
      {
        title: 'title',
        amount: 1000,
      },
      {
        title: 'title2',
        amount: 2000,
      },
    ];

    const result = SpreadsheetParser.parseTransactions(raw);

    expect(result).toEqual(expected);
  });
});
