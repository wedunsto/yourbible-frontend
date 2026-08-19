import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { BibleStudyNote } from '../../../models/BibleStudyNote.model';

export interface UpdateBibleStudyNoteRequest {
  id: string;
  updates: BibleStudyNote;
}

export interface UpdateBibleStudyNoteResponse {
  response: BibleStudyNote;
}

@Injectable({
  providedIn: 'root'
})
export class UpdateBibleStudyNote {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private bibleStudyNotesEndpoint = environment.endpoints.note;

  public updateBibleStudyNote(request: UpdateBibleStudyNoteRequest): Observable<UpdateBibleStudyNoteResponse> {
    return this.http.patch<BibleStudyNote>(
      `${this.base}${this.bibleStudyNotesEndpoint}?id=${request.id}`,
      request.updates
    ).pipe(
      map((response) => ({ response }))
    );
  }
}
