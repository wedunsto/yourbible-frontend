import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class UserExistsService {
    private http = inject(HttpClient);
	private base = environment.apiBaseUrl;
	private userExistsEndpoint = environment.endpoints.userExists;

    /**
	 * Check if a username exists on the database
	 * @param username: The username to check
	 * @returns Observable<boolean>
	 */
	public getUserExists(username: string): Observable<boolean> {
		return this.http.get<boolean>(`${this.base}${this.userExistsEndpoint}`, { params: { username } });
	}
}