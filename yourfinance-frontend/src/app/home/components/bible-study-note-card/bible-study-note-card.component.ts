import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';

@Component({
  selector: 'app-bible-study-note-card',
  templateUrl: './bible-study-note-card.component.html',
  styleUrls: ['./bible-study-note-card.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  ]
})
export class BibleStudyNoteCardComponent {
  note = input.required<BibleStudyNote>();
}
