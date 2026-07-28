import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';
import { Observable } from 'rxjs';

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
  private bibleStudyNoteEndpoint = environment.endpoints.bibleStudyNotes;

  public createBibleStudyNote(payload: CreateBibleStudyNoteRequest): Observable<CreateBibleStudyNoteResponse> {
    return this.http.post<CreateBibleStudyNoteResponse>(
      `${this.base}${this.bibleStudyNoteEndpoint}`,
      {
        "bibleStudyNote": payload.payload
      }
    )
  }
}
