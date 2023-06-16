import AmountParser from './AmountParser';

class SpreadsheetParser {
  public static parseTransaction(raw: string): {
    title: string;
    amount: number;
  } {
    const [title, rawAmount] = raw.trim().split('\t');
    const amount = AmountParser.parseFromSpreadsheet(rawAmount);
    return {
      title,
      amount,
    };
  }

  public static parseTransactions(raw: string) {
    const lines = raw.trim().split('\n');
    const transactions: {
      title: string;
      amount: number;
    }[] = [];
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].trim() !== '') {
        const transaction = SpreadsheetParser.parseTransaction(lines[i]);
        transactions.push(transaction);
      }
    }

    return transactions;
  }
}

export default SpreadsheetParser;
