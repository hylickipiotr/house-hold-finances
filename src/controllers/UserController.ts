import { Authorized, Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';
import { ResponseWithData } from '../utils/types';

@JsonController('/user')
@Service()
export default class UserController {
  // eslint-disable-next-line class-methods-use-this
  @Authorized()
  @Get('/eligible')
  public importFromSpreadsheet(): ResponseWithData<{ isEligible: true }> {
    return {
      data: {
        isEligible: true,
      },
    };
  }
}
