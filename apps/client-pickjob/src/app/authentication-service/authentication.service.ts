import { Injectable } from '@nestjs/common';
import { UserCredentials } from 'libs/models/src/lib/User/UserCredentials.model';
import fetch from 'node-fetch';

@Injectable()
export class AuthenticationService {
  constructor() {}

  private fetch = require('node-fetch');
  user: UserCredentials;

  async getAuthToken(): Promise<string> {
    const credentials = require('../../app/credentials.json');
    const userCredentials: UserCredentials = await this.fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${credentials.authKey}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          returnSecureToken: credentials.returnSecureToken,
        }),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((res) => res.json());
    return userCredentials.idToken;
  }
}
