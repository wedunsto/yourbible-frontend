import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';
import { environment } from 'src/environments/environment';

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

  public readBibleStudyNotes(username: ReadBibleStudyNotesRequest): Observable<ReadBibleStudyNotesResponse> {
    return this.http.get<ReadBibleStudyNotesResponse>(
      `${this.base}${this.bibleStudyNotesEndpoint}?username=${username}`
    );
  }
}
