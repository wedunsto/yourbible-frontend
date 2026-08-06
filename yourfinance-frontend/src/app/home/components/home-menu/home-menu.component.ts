import { Component, OnInit } from '@angular/core';

import {
  IonMenu,
  IonHeader,
  IonTitle,
  IonContent,
  IonItemGroup,
  IonItem,
  IonLabel,
  IonToolbar
 } from '@ionic/angular/standalone';

 import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss'],
  imports: [
    IonMenu,
    IonHeader,
    IonTitle,
    IonContent,
    IonItemGroup,
    IonItem,
    IonLabel,
    IonToolbar,
    RouterModule
  ]
})
export class HomeMenuComponent  implements OnInit {
  ngOnInit() { }
}
