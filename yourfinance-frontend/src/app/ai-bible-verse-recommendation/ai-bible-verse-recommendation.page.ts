import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import { Store } from '@ngrx/store';
import { BibleStudyNote } from '../core/models/BibleStudyNote.model';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { BibleVerseRecommendation } from '../core/services/bible-verse-recommendations/bible-verse-recommendations.service';
import { BibleStudyNoteCardComponent } from '../home/components/bible-study-note-card/bible-study-note-card.component';

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
    BibleStudyNoteCardComponent
  ]
})
export class AiBibleVerseRecommendationPage implements OnInit {
  constructor(
    private store: Store,
    private bibleVerseRecommendationService: BibleVerseRecommendation
  ) { }

  username = '';
  recommendedNote: BibleStudyNote | null = null;

  ngOnInit() {
    // Get the username from the NgRx store
    this.store.select(selectUsername).subscribe((username: string) => {
      this.username = username;
    });
  }

  getBibleVerseRecommendation(): void {
    this.bibleVerseRecommendationService.bibleVerseRecommendation(this.username).subscribe((note) => {
      this.recommendedNote = note;
    });
  }
}
