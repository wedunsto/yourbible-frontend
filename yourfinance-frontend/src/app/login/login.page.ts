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
} from '@ionic/angular/standalone';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

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
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get usernameCtrl() {
    return this.loginForm.get('username');
  }

  get passwordCtrl() {
    return this.loginForm.get('password');
  }

  isPasswordModified(): boolean {
    return !!(this.passwordCtrl?.dirty || this.passwordCtrl?.touched);
  }

  loginAccount(): void {
    this.formSubmitted = true;

    if(!this.loginForm.valid) {
      // TODO: Build invalid styling and text to display
    } else {
      const username = this.usernameCtrl?.value?.trim();
      const password = this.passwordCtrl?.value?.trim();
    }
  }
}
