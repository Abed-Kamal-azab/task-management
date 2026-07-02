import { inject, Injectable, signal } from '@angular/core';
import { ApiService } from '../../core/services/api-service';
import {
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  signupResponse,
  UserMetadata,
} from '../../models/accounts.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private apiService = inject(ApiService);
  readonly userMetadata = signal<UserMetadata | null>(null);

  signUp(data: SignUpRequest): Observable<signupResponse> {
    return this.apiService.post<signupResponse>('auth/v1/signup', data);
  }

  logIn(data: SignInRequest): Observable<SignInResponse> {
    return this.apiService.post<SignInResponse>('auth/v1/token?grant_type=password', data).pipe(
      tap((res: SignInResponse) => {
        localStorage.setItem(accessTokenKey, res.access_token);
        localStorage.setItem(refreshTokenKey, res.refresh_token);
        this.userMetadata.set(res.user.user_metadata);
      }),
    );
  }

  logOut(password: { password: string | null }): Observable<unknown> {
    return this.apiService.post('/auth/v1/logout', password).pipe(
      tap(() => {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);

        this.userMetadata.set(null);
      }),
    );
  }
}
