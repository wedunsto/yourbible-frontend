import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { 
  IonContent,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonImg,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { selectExists } from '../core/states/authentication/welcome/welcome.feature';
import { Store } from '@ngrx/store';
import { userExistsChecked } from '../core/states/authentication/welcome/welcome.actions';
import { AuthHeaderComponent } from '../components/auth-header/auth-header.component';

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
    IonImg,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthHeaderComponent
  ]
})
export class WelcomePage {
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  usernameForm = this.fb.group({
    username: ['', [Validators.required]]
  });

  onContinue = () => {
    const username = this.usernameForm.get('username')?.value?.trim();
    if(!username) return;

    this.store.dispatch(userExistsChecked({ username }));

    // Subscribe to the store's selector (auto-updated by reducer)
    this.store.select(selectExists).subscribe ((exists: boolean) => {

      if (exists) {
        console.log('Navigate to login');
      } else {
        this.router.navigate(['/register']); 
      }
    })
  }
}
