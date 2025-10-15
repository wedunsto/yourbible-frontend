import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton,
  IonImg,
} from '@ionic/angular/standalone';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { selectExists } from '../core/states/authentication/welcome/welcome.feature';
import { Store } from '@ngrx/store';
import { userExistsChecked } from '../core/states/authentication/welcome/welcome.actions';

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
    FormsModule
  ]
})
export class WelcomePage {
  constructor(private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) { }

  onContinue = () => {
    const username = this.usernameForm.get('username')?.value?.trim();

    if(!username) return;

    this.store.dispatch(userExistsChecked({ username }));
  }

  usernameForm = this.fb.group({
    username: ['', [Validators.required]]
  });

  ngOnInit() {
    // Subscribe to the store's selector (auto-updated by reducer)
    this.store.select(selectExists).subscribe ((exists: boolean) => {
      const username = this.usernameForm.get('username')?.value?.trim();
      if(!username) return;

      if (exists) {
        console.log('Navigate to login');
      } else {
        console.log('Navigate to regiser');
      }
    })
  }
}
