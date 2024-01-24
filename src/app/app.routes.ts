import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    title: 'Home',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },

  {
    path: 'calendar',
    title: 'Calendar',
    loadComponent: () => import('./components/calendar/calendar.component').then(c => c.CalendarComponent),
  },

  {
    path: 'graphics',
    title: 'Graphics',
    loadComponent: () => import('./components/graphics/graphics.component').then(c => c.GraphicsComponent),
  },

  {
    path: 'map',
    title: 'Maps',
    loadComponent: () => import('./components/map/map.component').then(c => c.MapComponent),
  },

  {
    path: '',
    title: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent),
  },


];
