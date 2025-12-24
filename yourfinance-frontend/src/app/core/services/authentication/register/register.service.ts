import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface RegisterPayload {
  username: string,
  password: string
}

export interface RegisterResponse {
  username: string,
  accountStatus: string
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private registerEndpoint = environment.endpoints.register;

  /**
   * Create a new account in the database
   * @param username: The username of the new account
   * @param password: The password of the new account
   */
  public registerAccount(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      `${this.base}${this.registerEndpoint}`,
      payload
    );
  }
}
