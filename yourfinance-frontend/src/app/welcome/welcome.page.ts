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
import { UserExistsService } from '../core/services/authentication/userExists.service';
import { Router } from '@angular/router';

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
    private userExistsService: UserExistsService,
    private router: Router
  ) { }

  onContinue = () => {
    const username = this.usernameForm.get('username')?.value?.trim();

    if(!username) return;

    this.userExistsService.getUserExists(username).subscribe(
      (exists: boolean) => {
        if (exists) {
          // this.router.navigation(['/login']);
          console.log('Username already exists');
        } else {
          // this.router.navigation(['/register']);
          console.log('Username available');
        }
      }
    );
  }

  usernameForm = this.fb.group({
    username: ['', [Validators.required]]
  });
}
