import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';

interface userExistsResponse {
	exists: boolean;
}

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
		const params = new HttpParams().set('username', username);
		
		// Check if the user exists, store the result in the returned observable
		return this.http.get<userExistsResponse>(`${this.base}${this.userExistsEndpoint}`, { params })
		.pipe(map((res) => res.exists));;
	}
}