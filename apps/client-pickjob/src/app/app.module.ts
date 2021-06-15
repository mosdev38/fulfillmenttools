import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationService } from './authentication-service/authentication.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { PickJobController } from './pickjob/pickjob.controller';
import { PickjobService } from './pickjob/pickjob.service';

@Module({
  imports: [],
  controllers: [AppController, OrderController, PickJobController],
  providers: [AppService, AuthenticationService, OrderService, PickjobService],
})
export class AppModule {}
