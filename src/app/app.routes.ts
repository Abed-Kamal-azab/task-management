import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'sign-up',
    // component: SignUp,
    loadComponent: () =>
      import('./features/components/account-info/sign-up/sign-up').then((c) => c.SignUp),

    canActivate: [guestGuard],
  },
  {
    path: 'login',
    // component: Login,
    loadComponent: () =>
      import('./features/components/account-info/login/login').then((c) => c.Login),
    canActivate: [guestGuard],
  },
  {
    path: 'forgot-password',
    // component: ForgetPassword,
    loadComponent: () =>
      import('./features/components/account-info/forget-password/forget-password').then(
        (c) => c.ForgetPassword,
      ),
    canActivate: [guestGuard],
  },
  {
    path: 'reset-password',
    // component: ResetPassword,
    loadComponent: () =>
      import('./features/components/account-info/reset-password/reset-password').then(
        (c) => c.ResetPassword,
      ),
    canActivate: [guestGuard],
  },
  {
    path: '',
    // component: Sidebar,
    loadComponent: () => import('./layout/sidebar/sidebar/sidebar').then((c) => c.Sidebar),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full',
      },
      {
        path: 'projects',
        data: { breadcrumb: 'projects' },
        loadComponent: () =>
          import('./features/components/projects/list-projects/list-projects').then(
            (c) => c.ListProjects,
          ),
      },
      {
        path: 'projects/add',
        // component: AddNewProject,
        loadComponent: () =>
          import('./features/components/projects/add-new-project/add-new-project').then(
            (c) => c.AddNewProject,
          ),
      },
      {
        path: 'projects/edit/:id',
        // component: EditProject,
        loadComponent: () =>
          import('./features/components/projects/edit-project/edit-project').then(
            (c) => c.EditProject,
          ),
      },
      {
        path: 'projects/members/:id',
        // component: ListProjectMember,
        loadComponent: () =>
          import('./features/components/projects/list-project-member/list-project-member').then(
            (c) => c.ListProjectMember,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full',
  },
];
