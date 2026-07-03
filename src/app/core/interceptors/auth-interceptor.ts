import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';

const accessTokenKey = 'access_token';

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

  return next(clonedRequest);
};
