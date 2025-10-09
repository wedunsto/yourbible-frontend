import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Encapsulate project properties in a application config file
bootstrapApplication(AppComponent, appConfig);
