import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent,
  IonText,
  IonLabel,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { FormBuilder, Validators } from '@angular/forms';

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
    FormsModule
  ]
})
export class WelcomePage implements OnInit {
  constructor(private fb: FormBuilder) { }

  emailForm = this.fb.group({
    email:['', [Validators.required, Validators.email]]
  });

  ngOnInit() {
  }

}
