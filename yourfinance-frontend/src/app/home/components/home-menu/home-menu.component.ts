import { Component, OnInit } from '@angular/core';

import {
  IonMenu,
  IonHeader,
  IonTitle,
  IonContent,
  IonItemGroup,
  IonItem,
  IonLabel
 } from '@ionic/angular/standalone';

 import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { BibleStudyNote } from 'src/app/core/models/BibleStudyNote.model';
import * as ReadBibleStudyNotesActions from 'src/app/core/states/bible-study-notes/read/read.actions';
import { selectUsername } from 'src/app/core/states/authentication/welcome/welcome.feature';
import { selectBibleStudyNotes } from 'src/app/core/states/bible-study-notes/bible-study-notes.feature';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
  imports: [
    IonMenu,
    IonHeader,
    IonTitle,
    IonContent,
    IonItemGroup,
    IonItem,
    IonLabel,
    RouterModule
  ]
})
export class HomeMenuComponent  implements OnInit {
  username: string = '';
  bibleStudyNotes: Array<BibleStudyNote> = [];
  
  constructor(
    private store: Store
  ) { }

    fetchBibleStudyNotes = () => {
    this.store.dispatch(ReadBibleStudyNotesActions.readBibleStudyNotesRequest({ request: {username: this.username} }))
  }

  ngOnInit() {
    // Get the username from the NgRx store
    this.store.select(selectUsername).subscribe((username: string) => {
      this.username = username;
    });

    this.fetchBibleStudyNotes();

    // Get the Bible study notes from the NgRx store to auto-populate
    this.store.select(selectBibleStudyNotes).subscribe((bibleStudyNotes: Array<BibleStudyNote>) => {
      this.bibleStudyNotes = bibleStudyNotes;
    });
  }
}
