import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Store } from '@ngrx/store';
import * as UpdateBibleStudyActions from '../core/states/bible-study-notes/update/update.actions';
import { BibleStudyCategory, BibleStudyNote } from '../core/models/BibleStudyNote.model';

import { FormInputComponent } from '../shared/components/form-input/form-input.component';
import { selectBibleStudyNotes } from '../core/states/bible-study-notes/bible-study-notes.feature';

@Component({
  selector: 'app-update-bible-study-note',
  templateUrl: './update-bible-study-note.page.html',
  styleUrls: ['./update-bible-study-note.page.scss'],
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
export class UpdateBibleStudyNotePage implements OnInit {
  // Bound automatically from the :id route parameter
  id = input<string>('');

  // Use dependency injection to get an instance of FormBuilder
  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  updateBibleStudyNoteForm !: ReturnType<FormBuilder['group']>;

  payload: BibleStudyNote = {
    id: '',
    username: '',
    book: '',
    chapter: 0,
    verses: '',
    study_categories: [],
    title: '',
    notes: '',
    created_at: new Date()
  };

  ngOnInit() {
    // Create the form when the update Bible study note page initializes
    this.updateBibleStudyNoteForm = this.fb.group({
      book: ['', [Validators.required]],
      chapter: [0, [Validators.required]],
      verses: ['', [Validators.required]],
      categories: [null, [Validators.required]],
      title: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      date: [null, [Validators.required]]
    });

    // Get the Bible study notes from the NgRx store, and find the note with the matching id
    this.store.select(selectBibleStudyNotes).subscribe((bibleStudyNotes: Array<BibleStudyNote>) => {
      const note = bibleStudyNotes.find((bibleStudyNote) => bibleStudyNote.id === this.id());

      if (!note) {
        return;
      }

      this.payload.id = note.id;
      this.payload.book = note.book;
      this.payload.chapter = note.chapter;
      this.payload.verses = note.verses;
      this.payload.study_categories = note.study_categories;
      this.payload.title = note.title;
      this.payload.notes = note.notes;
      this.payload.created_at = note.created_at;

      // Pre-populate the form with the existing Bible study note
      this.updateBibleStudyNoteForm.patchValue({
        book: note.book,
        chapter: note.chapter,
        verses: note.verses,
        categories: note.study_categories[0] ?? null,
        title: note.title,
        notes: note.notes,
        date: note.created_at
      });
    });
  }

  // Controllers make it easier to access values
  book(): string {
    return this.updateBibleStudyNoteForm.get('book')?.value;
  }

  chapter(): number {
    return this.updateBibleStudyNoteForm.get('chapter')?.value;
  }

  verses(): string {
    return this.updateBibleStudyNoteForm.get('verses')?.value;
  }

  categories(): BibleStudyCategory {
    return this.updateBibleStudyNoteForm.get('categories')?.value;
  }

  title(): string {
    return this.updateBibleStudyNoteForm.get('title')?.value;
  }

  notes(): string {
    return this.updateBibleStudyNoteForm.get('notes')?.value;
  }

  date(): string {
    return this.updateBibleStudyNoteForm.get('date')?.value;
  }

  submitBibleStudyNote(): void {
    if (this.updateBibleStudyNoteForm.invalid) {
      this.updateBibleStudyNoteForm.markAllAsTouched();
      return;
    }

    this.payload.book = this.book();
    this.payload.chapter = this.chapter();
    this.payload.verses = this.verses();
    this.payload.study_categories = [this.categories()];
    this.payload.title = this.title();
    this.payload.notes = this.notes();

    if (this.date()) {
      this.payload.created_at = new Date(this.date());
    }

    // Dispatch an NgRx action
    this.store.dispatch(UpdateBibleStudyActions.updateBibleStudyNoteRequest({ request: { id: this.id(), updates: this.payload } }));
  }
}
