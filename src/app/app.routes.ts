import { Routes } from '@angular/router';
import { SignUp } from './features/components/account-info/sign-up/sign-up';
import { Login } from './features/components/account-info/login/login';
import { ForgetPassword } from './features/components/account-info/forget-password/forget-password';
import { Sidebar } from './layout/sidebar/sidebar/sidebar';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUp,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'forget-password',
    component: ForgetPassword,
  },
  {
    path: 'projects',
    component: Sidebar,
  },

  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
