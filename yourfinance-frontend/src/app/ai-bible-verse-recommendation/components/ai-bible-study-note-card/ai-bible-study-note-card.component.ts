import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { BibleStudyNote } from '../../../core/models/BibleStudyNote.model';
import { createBibleStudyNoteRequest } from '../../../core/states/bible-study-notes/create/create.actions';

@Component({
  selector: 'app-ai-bible-study-note-card',
  templateUrl: './ai-bible-study-note-card.component.html',
  styleUrls: ['./ai-bible-study-note-card.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton
  ]
})
export class AiBibleStudyNoteCardComponent {
  note = input.required<BibleStudyNote>();
  deleted = output<void>();

  constructor(private store: Store) {}

  saveBibleStudyNote(): void {
    this.store.dispatch(createBibleStudyNoteRequest({ request: { payload: this.note() } }));
  }

  deleteBibleStudyNote(): void {
    this.deleted.emit();
  }
}
