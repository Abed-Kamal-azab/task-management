import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environment/environment';

const accessTokenKey = 'access_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const accessToken = localStorage.getItem(accessTokenKey);
  const authorizationToken = accessToken || environment.supabaseApiKey;

  const clonedRequest = req.clone({
    setHeaders: {
      apikey: environment.supabaseApiKey,
      Authorization: `Bearer ${authorizationToken}`,
      'Content-Type': 'application/json',
    },
  });

  return next(clonedRequest);
};
