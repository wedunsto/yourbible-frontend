import { Component, OnInit } from '@angular/core';

import {
  IonText,
  IonImg
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.scss'],
  imports: [
    IonText,
    IonImg
  ]
})
export class AuthHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
