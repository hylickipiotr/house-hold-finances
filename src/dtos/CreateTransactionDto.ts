import { TransactionType } from '@prisma/client';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  IsEnum,
  IsISO8601,
} from 'class-validator';

export default class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  amount: number;

  @IsString()
  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @IsISO8601({
    strict: true,
  })
  date: string;
}
