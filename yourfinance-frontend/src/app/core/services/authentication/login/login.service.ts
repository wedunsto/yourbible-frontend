import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface LoginPayload {
  username: string,
  password: string
}

export interface LoginResponse {
  accessToken: string,
  accountStatus: string,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private loginEndpoint = environment.endpoints.login;

  /**
   * Log into an existing account
   * @param username: The username of the existing account
   * @param password: The password of the existing account
   * @return access token: JWT to access the application
   * @return account status: Status confirming if the user has access to the application
   */
  public loginToAccount(payload: LoginPayload): Observable<LoginResponse> {
    const result = this.http.post<LoginResponse>(
      `${this.base}${this.loginEndpoint}`,
      payload
    );

    return result
  }
}
