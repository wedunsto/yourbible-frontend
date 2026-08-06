import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { BibleStudyNote } from '../../../core/models/BibleStudyNote.model';
import { DeleteBibleStudyNoteComponent } from '../delete-bible-study-note/delete-bible-study-note.component';


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
    IonCardContent,
    DeleteBibleStudyNoteComponent
  ]
})
export class BibleStudyNoteCardComponent {
  note = input.required<BibleStudyNote>();
}
