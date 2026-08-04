import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { HomeMenuComponent } from './components/home-menu/home-menu.component';
import { Store } from '@ngrx/store';
import { BibleStudyNote } from '../core/models/BibleStudyNote.model';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { selectBibleStudyNotes } from '../core/states/bible-study-notes/bible-study-notes.feature';
import { BibleStudyNotesListComponent } from './components/bible-study-notes-list/bible-study-notes-list.component';
import { readBibleStudyNotesRequest } from '../core/states/bible-study-notes/read/read.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HomeMenuComponent,
    IonButtons,
    IonMenuButton,
    BibleStudyNotesListComponent
  ]
})
export class HomePage implements OnInit {
username: string = '';
  bibleStudyNotes: Array<BibleStudyNote> = [];
  
  constructor(
    private store: Store
  ) { }

    fetchBibleStudyNotes = () => {
    this.store.dispatch(readBibleStudyNotesRequest({ request: {username: this.username} }))
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
