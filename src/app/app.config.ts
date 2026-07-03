import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';

const redirectToResetPassword = (router: Router) => {
  return () => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessTokenFromQuery = queryParams.get('access_token');

    const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
    const hashParams = new URLSearchParams(hash);
    const accessTokenFromHash = hashParams.get('access_token');
    const type = hashParams.get('type') || queryParams.get('type');
    const accessToken = accessTokenFromQuery || accessTokenFromHash;

    if (accessToken && (type === 'recovery' || window.location.pathname !== '/reset-password')) {
      return router.navigate(['/reset-password'], {
        queryParams: {
          access_token: accessToken,
          ...(type ? { type } : {}),
        },
        replaceUrl: true,
      });
    }

    return Promise.resolve(true);
  };
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: redirectToResetPassword,
      deps: [Router],
      multi: true,
    },
  ],
};
