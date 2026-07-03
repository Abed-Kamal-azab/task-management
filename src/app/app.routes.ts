import { Routes } from '@angular/router';
import { SignUp } from './features/components/account-info/sign-up/sign-up';
import { Login } from './features/components/account-info/login/login';
import { ForgetPassword } from './features/components/account-info/forget-password/forget-password';
import { Sidebar } from './layout/sidebar/sidebar/sidebar';
import { ResetPassword } from './features/components/account-info/reset-password/reset-password';

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
    path: 'forgot-password',
    component: ForgetPassword,
  },
  {
    path: 'reset-password',
    component: ResetPassword,
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
