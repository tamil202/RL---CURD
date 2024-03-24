import { Routes } from '@angular/router';
import { CurdComponent } from './home/curd/curd.component';

export const routes: Routes = [
  {
    path: 'test',
    loadChildren: () => import('./auth/auth.route'),
  },
  {
    path: 'test2',
    loadChildren: () => import('./home/home.route'),
  },
];
