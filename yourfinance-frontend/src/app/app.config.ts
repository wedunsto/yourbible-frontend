import { ApplicationConfig } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { WelcomeFeature } from './core/states/authentication/welcome/welcome.feature';
import { RegisterFeature } from './core/states/authentication/register/register.feature';
import { LoginFeature } from './core/states/authentication/login/login.feature';
import { WelcomeEffects } from './core/states/authentication/welcome/welcome.effects';
import { RegisterEffects } from './core/states/authentication/register/register.effects';
import { LoginEffects } from './core/states/authentication/login/login.effects';

// Provide NgRx Store to the application
export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(
      //withInterceptors([authInterceptor]) // attach JWT automatically
    ),
    provideStore(),                     // root store
    provideStoreDevtools(),             // optional devtools
    provideState(WelcomeFeature),       // registers your welcome feature
    provideState(RegisterFeature),
    provideState(LoginFeature),
    provideEffects([WelcomeEffects, RegisterEffects, LoginEffects]),   // optional effects
  ],
};