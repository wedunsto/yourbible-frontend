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
import { toLocalDateOnly, toStudyDate } from '../core/utils/study-date';

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
  id = input<string>('');

  // Use dependency injection to get an instance of FormBuilder
  constructor(
    private store: Store,
    private fb: FormBuilder
  ) { }

  updateBibleStudyNoteForm !: ReturnType<FormBuilder['group']>;

  payload: BibleStudyNote = {
    id: '',
    user_id: '',
    book: '',
    chapter: 0,
    verses: '',
    study_categories: [],
    title: '',
    notes: '',
    study_date: toLocalDateOnly()
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
      date: [toLocalDateOnly(), [Validators.required]]
    });

    // Find the Bible study note being updated from the store using the route id
    this.store.select(selectBibleStudyNotes).subscribe((bibleStudyNotes: BibleStudyNote[]) => {
      const note = bibleStudyNotes.find((bibleStudyNote) => bibleStudyNote.id === this.id());

      if (!note) {
        return;
      }

      this.payload.id = note.id;
      this.payload.user_id = note.user_id;
      this.payload.book = note.book;
      this.payload.chapter = note.chapter;
      this.payload.verses = note.verses;
      this.payload.study_categories = note.study_categories;
      this.payload.title = note.title;
      this.payload.notes = note.notes;
      this.payload.study_date = toStudyDate(note.study_date);

      // Pre-populate the form with the existing Bible study note
      this.updateBibleStudyNoteForm.patchValue({
        book: note.book,
        chapter: note.chapter,
        verses: note.verses,
        categories: note.study_categories.length ? note.study_categories : null,
        title: note.title,
        notes: note.notes,
        date: toStudyDate(note.study_date)
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

  categories(): BibleStudyCategory[] {
    return this.updateBibleStudyNoteForm.get('categories')?.value ?? [];
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

  /**
   * Validates the form and, if valid, dispatches an update request with the
   * edited fields merged into the existing note.
   */
  submitBibleStudyNote(): void {
    if (this.updateBibleStudyNoteForm.invalid) {
      this.updateBibleStudyNoteForm.markAllAsTouched();
      return;
    }

    this.payload.book = this.book();
    this.payload.chapter = this.chapter();
    this.payload.verses = this.verses();
    this.payload.study_categories = this.categories();
    this.payload.title = this.title();
    this.payload.notes = this.notes();

    this.payload.study_date = toStudyDate(this.date());

    // Dispatch an NgRx action
    this.store.dispatch(UpdateBibleStudyActions.updateBibleStudyNoteRequest({ request: { id: this.payload.id, updates: this.payload } }));
  }
}
