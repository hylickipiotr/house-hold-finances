export const stringParser = (value: string): string => value;

export const numberParser = (value: string): number => {
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number ${value}`);
  }
  return parsed;
};

export const booleanParser = (value: string): boolean => {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  throw new Error(`Invalid boolean ${value}`);
};

type EnvName = 'PORT';

type EnvParser<TValue = string> = (value: string) => TValue;

type GetEnvOptions<
  TValue = string,
  TParser extends EnvParser<TValue> = EnvParser<TValue>
> = {
  required?: boolean;
  defaultValue?: TValue;
  parser?: TParser;
};

export const getEnv = <
  TValue = string,
  TParser extends EnvParser<TValue> = EnvParser<TValue>
>(
  name: EnvName,
  {
    required = false,
    parser,
    defaultValue,
  }: GetEnvOptions<TValue, TParser> = {}
): TValue => {
  const value = process.env[name];
  if (value === undefined) {
    if (required) {
      throw new Error(`Missing required env ${name}`);
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Missing env ${name}`);
  }
  const parsedValue = parser?.(value) ?? stringParser(value);
  return parsedValue as TValue;
};

export const getEnvNumber = (
  name: EnvName,
  options?: GetEnvOptions<number, EnvParser<number>>
): number => getEnv(name, { ...options, parser: numberParser });

export const getEnvBoolean = (
  name: EnvName,
  options?: GetEnvOptions<boolean, EnvParser<boolean>>
): boolean => getEnv(name, { ...options, parser: booleanParser });

export const getPort = getEnvNumber.bind(null, 'PORT', { defaultValue: 5000 });
