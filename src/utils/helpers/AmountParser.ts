class AmountParser {
  public static parseFromSpreadsheet(raw: string): number {
    const amount = parseFloat(
      raw
        .trim()
        // eslint-disable-next-line no-control-regex
        .replace(/[^\u0000-\u007E]/g, '')
        .replaceAll(' ', '')
        .replace(',', '.')
        .replace('zł', '')
    );

    return amount;
  }
}

export default AmountParser;
