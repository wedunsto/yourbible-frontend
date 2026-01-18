import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { 
  IonContent,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { selectExists } from '../core/states/authentication/welcome/welcome.feature';
import { Store } from '@ngrx/store';
import { userExistsChecked } from '../core/states/authentication/welcome/welcome.actions';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonText,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthHeaderComponent
  ]
})

export class WelcomePage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  ngOnInit() {
    this.usernameForm.get('username')?.valueChanges.subscribe(() => {
    this.formSubmitted = false;
  });
  }

  formSubmitted: boolean = false;

  // Ensure username has at least 5 characters
  usernameValidation = (control: AbstractControl) => {
  const username: string = control.value ?? '';
  const errors: ValidationErrors = {};

  if (username.length < 5) {
    errors['minlength'] = true;
  }

  return Object.keys(errors).length ? errors :null;
}

  usernameForm = this.fb.group({
    username: ['', [Validators.required, this.usernameValidation]]
  });

  // Access the username form value
  get usernameCtrl() {
    return this.usernameForm.get('username');
  }

  // Access the username value error object. Check if the length is too short based on the username validation function
  isUsernameTooShort() {
    return !!this.usernameCtrl?.hasError('minlength');
  }

  isUsernameNotModified = () => {
    return !!(!this.usernameCtrl?.touched && !this.usernameCtrl?.dirty);
  }

  onContinue = () => {
    this.formSubmitted = true;
    const username = this.usernameForm.get('username')?.value?.trim();
    if(!username || this.isUsernameTooShort()) return;

    this.store.dispatch(userExistsChecked({ username }));

    // Subscribe to the store's selector (auto-updated by reducer)
    this.store.select(selectExists)
    .pipe(
      filter(exists => exists != null),
      take(1))
    .subscribe ((exists: boolean) => {
      if (exists) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']); 
      }
    })
  }
}
