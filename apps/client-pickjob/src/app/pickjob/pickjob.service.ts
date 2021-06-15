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

  async pickItems(pickjobId: string): Promise<Pickjob[]> {
    const token = await this.authService.getAuthToken();
    const pickjob: Pickjob = await this.getPickjob(pickjobId, token);
    const pickActions = pickjob.pickLineItems.map(item => {
      return {
        id: item.id,
        action: 'ModifyPickLineItem',
        status: 'CLOSED',
        picked: item.quantity,
      }
    })
    const resPickjobs = await fetch(this.apiUrl + `/${pickjobId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        version: pickjob.version,
        actions: [
          {
            action: 'ModifyPickJob',
            status: 'CLOSED',
          },
          ...pickActions,
        ],
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resPickjobs.json();
  }

  async getPickjob(pickjobId:string, token:string):Promise<Pickjob>{
    const resPickjobs = await fetch(this.apiUrl + `/${pickjobId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return resPickjobs.json();
  }
}
