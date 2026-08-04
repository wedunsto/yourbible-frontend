import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

interface userExistsResponse {
	destination: string;
}

@Injectable({providedIn: 'root'})
export class UserExistsService {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private userExistsEndpoint = environment.endpoints.userExists;
  
  /**
    * Check if a username exists on the database
    * @param username: The username to check
    * @returns Observable<boolean>
    */
  public getUserExists(username: string): Observable<string> {
    const params = new HttpParams().set('username', username);
    
    // Check if the user exists, store the result in the returned observable
    return this.http.get<userExistsResponse>(`${this.base}${this.userExistsEndpoint}`, { params })
      .pipe(map((res) => {
        return res.destination;
      }
    ));
  }
}
