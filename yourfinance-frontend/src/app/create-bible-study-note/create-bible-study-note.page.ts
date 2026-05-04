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
    // Create the form when the create Bible study page initializes
    this.createBibleStudyNoteForm = this.fb.group({
      book: ['', [Validators.required]],
      chapter: [0, [Validators.required]],
      verses: [[], [Validators.required]],
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

  verses(): number[] {
    return this.createBibleStudyNoteForm.get('verses')?.value;
  }

  categories(): BibleStudyCategory[] {
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

    const payload: BibleStudyNote = {
      book: this.book(),
      chapter: this.chapter(),
      verses: this.verses(),
      studyCategories: this.categories(),
      title: this.title(),
      notes: this.notes(),
      studyDate: this.date()
    }

    // Dispatch an NgRx action
    // TODO: Fix this structure
    this.store.dispatch(CreateBibleStudyActions.createBibleStudyNoteRequest({request: {payload}}))
  }
}
