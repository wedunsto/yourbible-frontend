import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BibleStudyNote } from '../../../models/BibleStudyNote.model';

export interface CreateBibleStudyNoteRequest {
  payload: BibleStudyNote
}

export interface CreateBibleStudyNoteResponse {
  response: BibleStudyNote;
}

@Injectable({
  providedIn: 'root'
})
export class CreateBibleStudyNote {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private bibleStudyNotesEndpoint = environment.endpoints.notes;

  public createBibleStudyNote(payload: CreateBibleStudyNoteRequest): Observable<CreateBibleStudyNoteResponse> {
    return this.http.post<BibleStudyNote>(
      `${this.base}${this.bibleStudyNotesEndpoint}`,
      {
        "bibleStudyNote": payload.payload
      }
    ).pipe(
      map((response) => ({ response }))
    )
  }
}
