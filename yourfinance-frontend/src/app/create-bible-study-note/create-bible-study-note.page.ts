import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import * as CreateBibleStudyActions from '../core/states/bible-study-notes/create/create.actions';
import { BibleStudyCategory, BibleStudyNote } from '../core/models/BibleStudyNote.model';

import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';

@Component({
  selector: 'app-create-bible-study-note',
  templateUrl: './create-bible-study-note.page.html',
  styleUrls: ['./create-bible-study-note.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent
  ]
})
export class CreateBibleStudyNotePage implements OnInit {
  // Use dependency injection to get an instance of FormBuilder
  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  createBibleStudyNoteForm !: ReturnType<FormBuilder['group']>;

  // Payload being sent to the back-end
  payload: BibleStudyNote = {
    username: '',
    book: '',
    chapter: 0,
    verses: '',
    study_categories: [],
    title: '',
    notes: '',
    created_at: new Date()
  };

  /**
   * 	- The book in the Bible
	- The chapter in the book
	- The verse(s) in the chapter
	- Bible study categories applied to these Bible study notes
	- Title of the Bible study notes
	- Bible study note(s)
	- Bible study note date
   */

  ngOnInit() {
    // Get the username from the NGRX store to auto populate the
    this.store.select(selectUsername).subscribe((username: string) => {
    this.payload.username = username;
  });

    // Create the form when the create Bible study page initializes
    this.createBibleStudyNoteForm = this.fb.group({
      book: ['', [Validators.required]],
      chapter: [0, [Validators.required]],
      verses: ['', [Validators.required]],
      categories: [null, [Validators.required]],
      title: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      date: [null, [Validators.required]]
    })
  }

  // Controllers make it easier to access values
  book(): string {
    return this.createBibleStudyNoteForm.get('book')?.value;
  }

  chapter(): number {
    return this.createBibleStudyNoteForm.get('chapter')?.value;
  }

  verses(): string {
    return this.createBibleStudyNoteForm.get('verses')?.value;
  }

  categories(): BibleStudyCategory {
    return this.createBibleStudyNoteForm.get('categories')?.value;
  }

  title(): string {
    return this.createBibleStudyNoteForm.get('title')?.value;
  }

  notes(): string {
    return this.createBibleStudyNoteForm.get('notes')?.value;
  }

  date(): string {
    return this.createBibleStudyNoteForm.get('date')?.value;
  }

  submitBibleStudyNote(): void {
    if (this.createBibleStudyNoteForm.invalid) {
      this.createBibleStudyNoteForm.markAllAsTouched();
      return;
    }

    this.payload.book = this.book();
    this.payload.chapter = this.chapter();
    this.payload.verses = this.verses();
    this.payload.study_categories = [this.categories()];
    this.payload.title = this.title();
    this.payload.notes = this.notes();

    if(this.date()) {
      this.payload.created_at = new Date(this.date());
    }

    // Dispatch an NgRx action
    this.store.dispatch(CreateBibleStudyActions.createBibleStudyNoteRequest({ request: { payload: this.payload } }))
  }
}
