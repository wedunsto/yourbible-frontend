import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { map, Observable, switchMap, take } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { environment } from '../../../../environments/environment';
import { BibleStudyCategory, BibleStudyNote } from '../../models/BibleStudyNote.model';
import { readBibleStudyNotesRequest, readBibleStudyNotesSuccess } from '../../states/bible-study-notes/read/read.actions';
import { createBibleStudyNoteRequest } from '../../states/bible-study-notes/create/create.actions';

export interface BibleVerse {
  book: string;
  chapter: number;
  verse: string;
}

export interface BibleVerseRecommendationRequest {
  username: string;
  categories: BibleStudyCategory[];
}

export interface BibleVerseRecommendationResponse {
  category: BibleStudyCategory;
  bibleVerse: BibleVerse;
  bibleVerseText: string;
}

@Injectable({
  providedIn: 'root'
})
export class BibleVerseRecommendation {
  private http = inject(HttpClient);
  private store = inject(Store);
  private actions$ = inject(Actions);
  private base = environment.apiBaseUrl;
  private bibleVerseRecommendationEndpoint = environment.endpoints.recommend;

  public bibleVerseRecommendation(username: string): Observable<BibleStudyNote> {
    // Dispatch the read action to get all the user's Bible study notes
    this.store.dispatch(readBibleStudyNotesRequest({ request: { username } }));

    return this.actions$.pipe(
      ofType(readBibleStudyNotesSuccess), // Wait for the user's Bible study notes to load
      take(1),
      // Collect every study category across the user's Bible study notes into 1 array
      map(({ response }) =>
        response.bibleStudyNotes.flatMap((note) => note.study_categories)
      ),
      switchMap((study_categories) =>
        this.http.post<BibleVerseRecommendationResponse>(
          `${this.base}${this.bibleVerseRecommendationEndpoint}`,
          { username, categories: study_categories } as BibleVerseRecommendationRequest
        )
      ),
      map((response) => {
        const bibleStudyNote: BibleStudyNote = {
          id: uuidv4(),
          username,
          book: response.bibleVerse.book,
          chapter: response.bibleVerse.chapter,
          verses: response.bibleVerse.verse,
          study_categories: [response.category],
          title: `Recommendation on ${response.category}`,
          notes: response.bibleVerseText,
          created_at: new Date()
        };

        // Create the Bible study note in the NgRx store
        this.store.dispatch(
          createBibleStudyNoteRequest({ request: { payload: bibleStudyNote } })
        );

        return bibleStudyNote;
      })
    );
  }
}
