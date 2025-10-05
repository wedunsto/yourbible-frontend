import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  IonContent,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { FormBuilder, Validators } from '@angular/forms';
import { UserExistsService } from '../core/services/authentication/userExists.service';

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
    FormsModule
  ]
})
export class WelcomePage implements OnInit {
  constructor(private fb: FormBuilder,
    private userExistsService: UserExistsService
  ) { }

  emailForm = this.fb.group({
    email:['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
  }

}
