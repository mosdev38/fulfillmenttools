import { Injectable } from '@nestjs/common';
import { Pickjob } from 'libs/models/src/lib/pickjob/pickjob.model';
import { AuthenticationService } from '../authentication-service/authentication.service';
import fetch from 'node-fetch';

@Injectable()
export class PickjobService {
  constructor(private authService: AuthenticationService) {}

  private credentials = require('../../app/credentials.json');
  private apiUrl = `${this.credentials.apiUrl}api/pickjobs`;

  async getPickjobs(orderRef: string): Promise<Pickjob[]> {
    const token = await this.authService.getAuthToken();
    const resPickjobs = await fetch(this.apiUrl + `?orderRef=${orderRef}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resPickjobs.json();
  }

  async setInProgress(pickjobId: string): Promise<Pickjob[]> {
    const token = await this.authService.getAuthToken();
    const resPickjobs = await fetch(this.apiUrl + `/${pickjobId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        version: 1,
        actions: [
          {
            action: 'ModifyPickJob',
            status: 'IN_PROGRESS',
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resPickjobs.json();
  }

  async pickItems(pickjobId: string, picklineId: string): Promise<Pickjob[]> {
    const token = await this.authService.getAuthToken();
    const resPickjobs = await fetch(this.apiUrl + `/${pickjobId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        version: 2,
        actions: [
          {
            action: 'ModifyPickJob',
            status: 'CLOSED',
          },
          {
            id: picklineId,
            action: 'ModifyPickLineItem',
            status: 'CLOSED',
            picked: 1,
          },
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resPickjobs.json();
  }
}
