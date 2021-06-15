import { Injectable } from '@nestjs/common';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { Order } from 'libs/models/src/lib/order/order.model';
import fetch from 'node-fetch';

@Injectable()
export class OrderService {
  constructor(private authService: AuthenticationService) {}

  async createOrder(order: Order): Promise<Order> {
    const credentials = require('../../app/credentials.json');
    const apiUrl = `${credentials.apiUrl}api/orders`;
    const token = await this.authService.getAuthToken();
    const resOrder = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resOrder.json();
  }
}
