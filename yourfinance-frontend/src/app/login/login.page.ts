import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonButton,
  IonLabel,
  IonItem,
  IonInput
} from '@ionic/angular/standalone';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginState, selectLoginState } from '../core/states/authentication/login/login.feature';
import { selectUsername } from '../core/states/authentication/welcome/welcome.feature';
import { accountAuthenticatedRequest } from '../core/states/authentication/login/login.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonText,
    IonButton,
    IonLabel,
    IonItem,
    IonInput,
    CommonModule,
    FormsModule,
    AuthHeaderComponent,
    ReactiveFormsModule,
  ]
})

export class LoginPage implements OnInit {
  
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
  ) { }

  // Initialize the login form
  loginForm !: ReturnType<FormBuilder['group']>;

  ngOnInit() {
    // Create the form when the component initializes
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, this.usernameValidation]],
      password: ['', [Validators.required, this.passwordValidation]]
    });

    // Subscribe to the store's selectors
    this.store.select(selectUsername).subscribe((username: string) => {
      // Update the username value
      this.loginForm.get('username')?.setValue(username);
    });

    this.store.select(selectLoginState).subscribe(({accessToken, accountStatus}: LoginState) => {
        console.log(accessToken, accountStatus);
    });
  }

  usernameValidation = (control: AbstractControl): ValidationErrors | null => {
    const username: string = control.value ?? '';

    const errors: ValidationErrors = {};

    if (username.trim().length < 1) {
      errors['empty_username'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  passwordValidation = (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value ?? '';

    const errors: ValidationErrors = {};

    if (password.trim().length < 1) {
      errors['empty_password'] = true;
    }

    return Object.keys(errors).length ? errors : null;
  }

  get usernameCtrl() {
    return this.loginForm.get('username');
  }

  get passwordCtrl() {
    return this.loginForm.get('password');
  }

  loginAccount(): void {
    this.formSubmitted = true;

    if(this.loginForm.valid) {
      const username = this.usernameCtrl?.value?.trim();
      const password = this.passwordCtrl?.value?.trim();
      this.store.dispatch(accountAuthenticatedRequest({ username, password }));
    } 
  }
}
