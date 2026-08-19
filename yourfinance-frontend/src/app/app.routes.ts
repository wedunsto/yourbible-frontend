import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'welcome',
    loadComponent: () => import('./welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'create-bible-study-note',
    loadComponent: () => import('./create-bible-study-note/create-bible-study-note.page').then( m => m.CreateBibleStudyNotePage)
  },
  {
    path: 'update-bible-study-note/:id',
    loadComponent: () => import('./update-bible-study-note/update-bible-study-note.page').then( m => m.UpdateBibleStudyNotePage)
  },
  {
    path: 'ai-bible-verse-recommendation',
    loadComponent: () => import('./ai-bible-verse-recommendation/ai-bible-verse-recommendation.page').then( m => m.AiBibleVerseRecommendationPage)
  },


];
