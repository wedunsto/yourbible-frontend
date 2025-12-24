import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors} from '@angular/forms';
import {
  IonContent,
  IonLabel,
  IonText,
  IonItem,
  IonButton,
  IonInput
 } from '@ionic/angular/standalone';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { Store } from '@ngrx/store';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { Router } from '@angular/router';
import { accountCreated } from '../core/states/authentication/register/register.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonLabel,
    IonText,
    IonItem,
    IonButton,
    IonInput,
    CommonModule,
    FormsModule,
    AuthHeaderComponent,
    ReactiveFormsModule
  ]
})

export class RegisterPage implements OnInit {

  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  // Initialize the registration form
  registerForm !: ReturnType<FormBuilder['group']>;

  ngOnInit() {
    // Create the form when the component initializes
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, this.passwordValidation]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.confirmPasswordValidation });

    // Subscribe to the store's selector
    this.store.select(selectUsername).subscribe ((username: string) => {
      // update the username value
      this.registerForm.get('username')?.setValue(username);
    })

    // Reset the styling on the password field when the user modifies the value
    this.registerForm.get('password')?.valueChanges.subscribe(() => {
      this.formSubmitted = false;
    });
  }

  passwordValidation = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value ?? '';

    const errors: ValidationErrors = {};

    if (!/[A-Z]/.test(password)) {
      errors['uppercase'] = true;
    }
    if (!/[a-z]/.test(password)) {
      errors['lowercase'] = true;
    }
    if (!/[0-9]/.test(password)) {
      errors['number'] = true;
    }
    if (password.length < 8) {
      errors['minlength'] = { requiredLength: 8, actualLength: password.length };
    }

    return Object.keys(errors).length ? errors : null;
  }

  confirmPasswordValidation = (group: AbstractControl): ValidationErrors | null => {
    const confirmedPassword = group.get("confirmPassword")?.value ?? '';
    const password = group.get("password")?.value;

    const passwordsMatch = confirmedPassword === password;

    return passwordsMatch ? null : { passwordMismatch: true }
  }

  get passwordCtrl() {
    return this.registerForm.get('password');
  }

  isPasswordModified() {
    return !!(this.passwordCtrl?.dirty || this.passwordCtrl?.touched);
  }

  isPasswordInvalid() {
    return !!this.passwordCtrl?.invalid;
  }

  isPasswordTooShort() {
    return !!this.passwordCtrl?.hasError('minlength');
  }

  isPasswordMissingUppercase() {
    return !!this.passwordCtrl?.hasError('uppercase');
  }

  isPasswordMissingLowercase() {
    return !!this.passwordCtrl?.hasError('lowercase');
  }

  isPasswordMissingNumber() {
    return !!this.passwordCtrl?.hasError('number');
  }

  isPasswordMismatch() {
    return this.registerForm.hasError('passwordMismatch');
  }

  changePasswordField() {
    this.formSubmitted = false;
  }

  registerAccount = (): void => {
    this.formSubmitted = true;

    if (!this.registerForm.valid) {
      // TODO: Build invalid styling and text to display
    } else {
      const username = this.registerForm.get('username')?.value?.trim();
      const password = this.registerForm.get('password')?.value?.trim();
      this.store.dispatch(accountCreated({ username, password }))
    }
  }
}
