import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createBibleVerseCategoryRequest } from '../core/states/bible-verse-categories/bible-verse-categories.actions';

import { FormInputComponent } from '../shared/components/form-input/form-input.component';

// The maximum number of Bible verse categories a user can enter during onboarding
export const MAX_CATEGORIES = 10;

/**
 * Trims each category, then drops blank and repeated entries so the back-end
 * doesn't reject a duplicate category for the same user.
 * @param values The raw values of the category inputs
 * @returns The unique, non-blank category names in entry order
 */
export function toCategoryNames(values: string[]): string[] {
  const trimmed = values.map((value) => (value ?? '').trim()).filter((value) => value.length > 0);
  return trimmed.filter((value, index) => trimmed.indexOf(value) === index);
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonTitle,
    IonToolbar,
    CommonModule,
    ReactiveFormsModule,
    FormInputComponent
  ]
})
export class OnboardingPage implements OnInit {
  protected readonly MAX_CATEGORIES = MAX_CATEGORIES;

  onboardingForm !: ReturnType<FormBuilder['group']>;

  /**
   * Registers the icons used by the onboarding page.
   * @param store NgRx store used to dispatch category creation requests
   * @param fb FormBuilder used to build the onboarding form
   * @param router Router used to navigate home after onboarding
   */
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private router: Router
  ) {
    addIcons({ add });
  }

  /**
   * Builds the onboarding form with a single, empty Bible verse category input.
   */
  ngOnInit() {
    this.onboardingForm = this.fb.group({
      categories: this.fb.array([this.createCategoryControl()])
    });
  }

  /**
   * Creates a required form control for a single Bible verse category string.
   * @returns A new, empty category form control
   */
  createCategoryControl(): AbstractControl {
    return this.fb.control('', [Validators.required]);
  }

  /**
   * Gets the form array holding every Bible verse category input.
   * @returns The categories form array
   */
  categories(): FormArray {
    return this.onboardingForm.get('categories') as FormArray;
  }

  /**
   * Determines whether another Bible verse category input can be added.
   * @returns True while fewer than MAX_CATEGORIES inputs exist
   */
  canAddCategory(): boolean {
    return this.categories().length < MAX_CATEGORIES;
  }

  /**
   * Appends another Bible verse category input, up to MAX_CATEGORIES.
   */
  addCategory(): void {
    if (!this.canAddCategory()) {
      return;
    }

    this.categories().push(this.createCategoryControl());
  }

  /**
   * Dispatches a create Bible verse category request for every category entered in the form,
   * then routes the user home once the last request has been dispatched.
   * Marks every input as touched instead when no category was entered.
   */
  submitOnboarding(): void {
    const categoryNames = toCategoryNames(this.categories().value);

    if (this.onboardingForm.invalid || categoryNames.length === 0) {
      this.onboardingForm.markAllAsTouched();
      return;
    }

    categoryNames.forEach((category) =>
      this.store.dispatch(createBibleVerseCategoryRequest({ request: { category } }))
    );

    this.router.navigate(['/home']);
  }
}
