import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

const getAccessTokenFromUrl = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const tokenFromQuery = queryParams.get('access_token');

  if (tokenFromQuery) {
    return tokenFromQuery;
  }

  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : '';
  const params = new URLSearchParams(hash);
  return params.get('access_token');
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const recoveryToken = getAccessTokenFromUrl();
  const accessToken = recoveryToken || localStorage.getItem(accessTokenKey);
  const authorizationHeader = req.headers.has('Authorization')
    ? req.headers.get('Authorization')!
    : accessToken
      ? `Bearer ${accessToken}`
      : `Bearer ${environment.supabaseApiKey}`;

  const clonedRequest = req.clone({
    setHeaders: {
      apikey: environment.supabaseApiKey,
      Authorization: authorizationHeader,
      'Content-Type': 'application/json',
    },
  });

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (
        error.status === 401 &&
        !req.url.includes('/auth/v1/token') &&
        !req.url.includes('/auth/v1/logout') &&
        localStorage.getItem(refreshTokenKey)
      ) {
        return refreshAccessToken().pipe(
          switchMap(() => {
            const refreshedToken = localStorage.getItem(accessTokenKey);
            const retriedRequest = req.clone({
              setHeaders: {
                apikey: environment.supabaseApiKey,
                Authorization: `Bearer ${refreshedToken}`,
                'Content-Type': 'application/json',
              },
            });

            return next(retriedRequest);
          }),
          catchError(() => {
            localStorage.removeItem(accessTokenKey);
            localStorage.removeItem(refreshTokenKey);
            window.location.href = '/login';
            return throwError(() => error);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};

function refreshAccessToken() {
  const refreshToken = localStorage.getItem(refreshTokenKey);

  if (!refreshToken) {
    return throwError(() => new Error('No refresh token available'));
  }

  return from(
    fetch(`${environment.baseUrl}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: {
        apikey: environment.supabaseApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    }).then(async (response) => {
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || 'Failed to refresh token');
      }

      localStorage.setItem(accessTokenKey, data.access_token);
      localStorage.setItem(refreshTokenKey, data.refresh_token);

      return data;
    }),
  );
}
