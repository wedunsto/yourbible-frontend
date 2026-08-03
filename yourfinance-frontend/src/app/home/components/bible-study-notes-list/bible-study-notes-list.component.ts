import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';
import { BibleStudyNoteCardComponent } from 'src/app/shared/components/bible-study-note-card/bible-study-note-card.component';

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
