import { IsObject } from 'class-validator';

export default class EmcCreateSearchJobDTO {
  @IsObject()
  data: JSON;
}
