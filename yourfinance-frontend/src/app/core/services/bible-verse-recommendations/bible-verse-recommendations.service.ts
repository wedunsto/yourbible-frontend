import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BibleStudyCategory } from '../../models/BibleStudyNote.model';

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
  private base = environment.apiBaseUrl;
  private bibleVerseRecommendationEndpoint = environment.endpoints.recommend;

  public bibleVerseRecommendation(username: string, study_categories: BibleStudyCategory[]): Observable<BibleVerseRecommendationResponse> {
    return this.http.post<BibleVerseRecommendationResponse>(
      `${this.base}${this.bibleVerseRecommendationEndpoint}`,
      { username, categories: study_categories } as BibleVerseRecommendationRequest)
    }
}
