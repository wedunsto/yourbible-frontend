import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Store } from '@ngrx/store';
import { BibleStudyCategory, BibleStudyNote } from '../core/models/BibleStudyNote.model';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { BibleVerseRecommendation } from '../core/services/bible-verse-recommendations/bible-verse-recommendations.service';
import { AiBibleStudyNoteCardComponent } from './components/ai-bible-study-note-card/ai-bible-study-note-card.component';
import { selectBibleStudyNotes } from '../core/states/bible-study-notes/bible-study-notes.feature';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-ai-bible-verse-recommendation',
  templateUrl: './ai-bible-verse-recommendation.page.html',
  styleUrls: ['./ai-bible-verse-recommendation.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    CommonModule,
    AiBibleStudyNoteCardComponent
  ]
})
export class AiBibleVerseRecommendationPage implements OnInit {
  constructor(
    private store: Store,
    private bibleVerseRecommendationService: BibleVerseRecommendation
  ) { }

  username = '';
  categories: BibleStudyCategory[] = [];
  recommendedNote: BibleStudyNote | null = null;

  ngOnInit() {
    // Get the username from the NgRx store
    this.store.select(selectUsername).subscribe((username: string) => {
      this.username = username;
    });
    this.store.select(selectBibleStudyNotes).subscribe((bibleStudyNotes: BibleStudyNote[]) => {
      this.categories = bibleStudyNotes.flatMap((note) => note.study_categories)
    });
  }

  getBibleVerseRecommendation(): void {
    const username = this.username
    this.bibleVerseRecommendationService.bibleVerseRecommendation(this.username, this.categories).subscribe((response) => {
      const bibleStudyNote: BibleStudyNote = {
          id: uuidv4(),
          username: username,
          book: response.bibleVerse.book,
          chapter: response.bibleVerse.chapter,
          verses: String(response.bibleVerse.verse),
          study_categories: [response.category],
          title: `Recommendation on ${response.category}`,
          notes: response.bibleVerseText,
          created_at: new Date()
        };
      
      this.recommendedNote = bibleStudyNote;
    });
  }

  onNoteDeleted(): void {
    this.recommendedNote = null;
  }

  recommendationExists = ():boolean => {
    return this.recommendedNote !== null;
  }
}