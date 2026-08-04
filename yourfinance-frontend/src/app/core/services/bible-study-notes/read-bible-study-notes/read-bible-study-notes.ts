import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BibleStudyNote } from '../../../models/BibleStudyNote.model';
import { environment } from '../../../../../environments/environment';

export interface ReadBibleStudyNotesRequest {
  username: string
}

export interface ReadBibleStudyNotesResponse {
  bibleStudyNotes: Array<BibleStudyNote>
}

@Injectable({
  providedIn: 'root'
})
export class ReadBibleStudyNotes {
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;
  private bibleStudyNotesEndpoint = environment.endpoints.notes;

  public readBibleStudyNotes(request: ReadBibleStudyNotesRequest): Observable<ReadBibleStudyNotesResponse> {
    return this.http.get<Array<BibleStudyNote>>(
      `${this.base}${this.bibleStudyNotesEndpoint}?username=${request.username}`
    ).pipe(
      map((bibleStudyNotes) => ({ bibleStudyNotes }))
    );
  }
}
