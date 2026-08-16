import { Component, input } from '@angular/core';
import { Router } from '@angular/router';

import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-bible-study-note',
  templateUrl: './update-bible-study-note.component.html',
  styleUrls: ['./update-bible-study-note.component.scss'],
  imports: [
    IonButton
  ]
})
export class UpdateBibleStudyNoteComponent {
  id = input.required<string>();

  constructor(private router: Router) {}

  updateBibleStudyNote(): void {
    this.router.navigate(['/update-bible-study-note', this.id()]);
  }
}
