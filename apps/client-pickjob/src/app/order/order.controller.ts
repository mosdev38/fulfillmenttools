import { Body, Controller, Post } from '@nestjs/common';
import { Order } from 'libs/models/src/lib/order/order.model';
import { OrderService } from './order.service';
import fetch from 'node-fetch';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() order: Order): Promise<Order> {
    return this.orderService.createOrder(order);
  }
}
