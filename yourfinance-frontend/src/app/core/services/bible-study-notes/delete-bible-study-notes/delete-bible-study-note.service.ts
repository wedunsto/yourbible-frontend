import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export interface DeleteBibleStudyNoteRequest {
  id: string
}

export interface DeleteBibleStudyNoteResponse {
  id: string
}

@Injectable({
  providedIn: 'root'
})
export class DeleteBibleStudyNote {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private bibleStudyNotesEndpoint = environment.endpoints.note;

  public deleteBibleStudyNote(request: DeleteBibleStudyNoteRequest): Observable<DeleteBibleStudyNoteResponse> {
    return this.http.delete(
      `${this.base}${this.bibleStudyNotesEndpoint}?id=${request.id}`
    ).pipe(
      map(() => ({ id: request.id }))
    );
  }
}
