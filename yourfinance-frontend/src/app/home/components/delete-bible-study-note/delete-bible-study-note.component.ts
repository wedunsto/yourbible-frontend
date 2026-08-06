import { Component, input } from '@angular/core';
import { Store } from '@ngrx/store';

import { IonButton } from '@ionic/angular/standalone';

import { deleteBibleStudyNoteRequest } from '../../../core/states/bible-study-notes/delete/delete.actions';

@Component({
  selector: 'app-delete-bible-study-note',
  templateUrl: './delete-bible-study-note.component.html',
  styleUrls: ['./delete-bible-study-note.component.scss'],
  imports: [
    IonButton
  ]
})
export class DeleteBibleStudyNoteComponent {
  id = input.required<string>();

  constructor(private store: Store) {}

  deleteBibleStudyNote(): void {
    this.store.dispatch(deleteBibleStudyNoteRequest({ request: { id: this.id() } }));
  }
}
