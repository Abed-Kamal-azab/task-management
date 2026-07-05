import { Routes } from '@angular/router';
import { SignUp } from './features/components/account-info/sign-up/sign-up';
import { Login } from './features/components/account-info/login/login';
import { ForgetPassword } from './features/components/account-info/forget-password/forget-password';
import { ResetPassword } from './features/components/account-info/reset-password/reset-password';
import { ListProjects } from './features/components/projects/list-projects/list-projects';
import { AddNewProject } from './features/components/projects/add-new-project/add-new-project';
import { Sidebar } from './layout/sidebar/sidebar/sidebar';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUp,
    canActivate: [guestGuard],
  },
  {
    path: 'login',
    component: Login,
    // canActivate: [guestGuard],
  },
  {
    path: 'forgot-password',
    component: ForgetPassword,
    canActivate: [guestGuard],
  },
  {
    path: 'reset-password',
    component: ResetPassword,
    canActivate: [guestGuard],
  },
  {
    path: '',
    component: Sidebar,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        component: ListProjects,
      },
      {
        path: 'projects/add',
        component: AddNewProject,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
