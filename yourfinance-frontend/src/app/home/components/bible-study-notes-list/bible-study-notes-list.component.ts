import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibleStudyNoteCardComponent } from '../bible-study-note-card/bible-study-note-card.component';
import { BibleStudyNote } from '../../../core/models/BibleStudyNote.model';

/**
 * Objective: Display the list of Bible study notes
 */

@Component({
  selector: 'app-bible-study-notes-list',
  templateUrl: './bible-study-notes-list.component.html',
  styleUrls: ['./bible-study-notes-list.component.scss'],
  imports: [
    CommonModule,
    BibleStudyNoteCardComponent
  ]
})
export class BibleStudyNotesListComponent {
  bibleStudyNotes = input<BibleStudyNote[]>([]);
}
