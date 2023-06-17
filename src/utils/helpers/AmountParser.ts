class AmountParser {
  public static parseFromSpreadsheet(raw: string): number {
    if (raw == null || raw === '') {
      return 0;
    }

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
