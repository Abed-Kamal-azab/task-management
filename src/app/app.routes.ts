import { Routes } from '@angular/router';
import { SignUp } from './features/components/account-info/sign-up/sign-up';
import { Login } from './features/components/account-info/login/login';
import { ForgetPassword } from './features/components/account-info/forget-password/forget-password';
import { Sidebar } from './layout/sidebar/sidebar/sidebar';
import { ResetPassword } from './features/components/account-info/reset-password/reset-password';
import { ListProjects } from './features/components/projects/list-projects/list-projects';
import { AddNewProject } from './features/components/projects/add-new-project/add-new-project';

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
    children: [
      {
        path: 'project',
        component: ListProjects,
      },
      {
        path: 'add',
        component: AddNewProject,
      },
      {
        path: '',
        redirectTo: 'project',
        pathMatch: 'full',
      },

      {
        path: '**',
        redirectTo: 'project',
        pathMatch: 'full',
      },
    ],
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
