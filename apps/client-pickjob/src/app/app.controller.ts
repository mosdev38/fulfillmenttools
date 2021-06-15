import { Controller, Get} from '@nestjs/common';
import { UserCredentials } from 'libs/models/src/lib/User/UserCredentials.model'

import { AppService } from './app.service';
import { AuthenticationService } from './authentication-service/authentication.service';

@Controller()
export class AppController {

  user: UserCredentials;
  constructor(

    private readonly appService: AppService,
    private tokenService: AuthenticationService
    ) {
    }

  @Get()
  async getData() {
    const res = await this.tokenService.getAuthToken();
    return res;
  }

}
