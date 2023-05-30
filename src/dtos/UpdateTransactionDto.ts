import { TransactionType } from '@prisma/client';
import {
  IsEnum,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export default class UpdateTransactionDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @IsOptional()
  amount: number;

  @IsString()
  @IsEnum(TransactionType)
  @IsOptional()
  type: TransactionType;

  @IsISO8601({
    strict: true,
  })
  @IsOptional()
  date: Date;
}
