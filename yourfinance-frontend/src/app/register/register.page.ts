import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  Form
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonText,
  IonItem,
  IonButton,
  IonInput
 } from '@ionic/angular/standalone';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { Store } from '@ngrx/store';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { RegisterService } from '../core/services/authentication/register/register.service';
import { Router } from '@angular/router';
import { accountCreated } from '../core/states/authentication/register/register.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
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
  }

  passwordValidation = (control: AbstractControl): ValidationErrors | null => {
    const password = control.value ?? '';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const isValidLength = password.length >= 8;

    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && isValidLength;

    return passwordValid ? null : { weakPassword: true }
  }

  confirmPasswordValidation = (group: AbstractControl): ValidationErrors | null => {
    const confirmedPassword = group.get("confirmPassword")?.value ?? '';
    const password = group.get("password")?.value;

    const passwordsMatch = confirmedPassword === password;

    return passwordsMatch ? null : { passwordMismatch: true }
  }

  registerAccount = (): void => {
    if (!this.registerForm.valid) {
      // TODO: Build invalid styling and text to display
    } else {
      const username = this.registerForm.get('username')?.value?.trim();
      const password = this.registerForm.get('password')?.value?.trim();
      this.store.dispatch(accountCreated({ username, password }))
    }
  }
}
