import { Component, input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import {
  IonInput,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

type inputType = 'text' | 'number' | 'category' | 'notes' | 'date'

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  imports: [
    IonInput,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonItem,
    IonList,
    IonSelect,
    IonSelectOption
  ]
})
export class FormInputComponent {
  title = input<string>('');
  placeholder = input<string>('');
  type = input<inputType>('text');
  control = input<AbstractControl | null>(null);
}
