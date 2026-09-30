import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginState, selectLoginState } from '../../states/authentication/login/login.feature';

export interface CreateBibleVerseCategoryRequest {
  category: string;
}

export interface UpdateBibleVerseCategoryRequest {
  id: string;
  category: string;
}

export interface BibleVerseCategoryResponse {
  id: string;
  userId: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteBibleVerseCategoryResponse {
  id: string;
}

/**
 * Builds the HTTP headers that carry a bearer access token.
 * @param accessToken The access token stored in the login NgRx state
 * @returns Headers with the Authorization bearer token set
 */
export function buildAuthHeaders(accessToken: string): HttpHeaders {
  return new HttpHeaders({ Authorization: `Bearer ${accessToken}` });
}

@Injectable({
  providedIn: 'root'
})
export class BibleVerseCategories {
  private http = inject(HttpClient);
  private store = inject(Store);
  private base = environment.apiBaseUrl;
  private bibleStudyNoteCategoriesEndpoint = environment.endpoints.categories;

  /**
   * Creates a Bible verse category for the logged-in user.
   * @param request The category name
   * @returns The created category
   */
  public createBibleVerseCategory(request: CreateBibleVerseCategoryRequest): Observable<BibleVerseCategoryResponse> {
    return this.withLoginState((headers, userId) =>
      this.http.post<BibleVerseCategoryResponse>(
        `${this.base}${this.bibleStudyNoteCategoriesEndpoint}`,
        { userId, category: request.category },
        { headers }
      )
    );
  }

  /**
   * Reads every Bible verse category belonging to the logged-in user.
   * @returns The user's categories
   */
  public readBibleVerseCategories(): Observable<BibleVerseCategoryResponse[]> {
    return this.withLoginState((headers, userId) =>
      this.http.get<BibleVerseCategoryResponse[]>(
        `${this.base}${this.bibleStudyNoteCategoriesEndpoint}`,
        { headers, params: { userId } }
      )
    );
  }

  /**
   * Reads a single Bible verse category.
   * @param id The id of the category to read
   * @returns The matching category
   */
  public readBibleVerseCategory(id: string): Observable<BibleVerseCategoryResponse> {
    return this.withLoginState((headers) =>
      this.http.get<BibleVerseCategoryResponse>(
        `${this.base}${this.bibleStudyNoteCategoriesEndpoint}/${id}`,
        { headers }
      )
    );
  }

  /**
   * Renames a Bible verse category.
   * @param request The id of the category and its new name
   * @returns The updated category
   */
  public updateBibleVerseCategory(request: UpdateBibleVerseCategoryRequest): Observable<BibleVerseCategoryResponse> {
    return this.withLoginState((headers) =>
      this.http.patch<BibleVerseCategoryResponse>(
        `${this.base}${this.bibleStudyNoteCategoriesEndpoint}/${request.id}`,
        { category: request.category },
        { headers }
      )
    );
  }

  /**
   * Deletes a Bible verse category.
   * @param id The id of the category to delete
   * @returns The id of the deleted category
   */
  public deleteBibleVerseCategory(id: string): Observable<DeleteBibleVerseCategoryResponse> {
    return this.withLoginState((headers) =>
      this.http.delete<DeleteBibleVerseCategoryResponse>(
        `${this.base}${this.bibleStudyNoteCategoriesEndpoint}/${id}`,
        { headers }
      )
    );
  }

  /**
   * Reads the current login state from the NgRx store once and passes
   * bearer-token headers and the logged-in user's id to the given request.
   * @param request Builds the HTTP request using the authorization headers and user id
   * @returns The HTTP request's response
   */
  private withLoginState<T>(request: (headers: HttpHeaders, userId: string) => Observable<T>): Observable<T> {
    return this.store.select(selectLoginState).pipe(
      take(1),
      switchMap(({ accessToken, userId }: LoginState) => request(buildAuthHeaders(accessToken), userId))
    );
  }
}
