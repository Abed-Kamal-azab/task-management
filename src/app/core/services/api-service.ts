import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private httpClient = inject(HttpClient);
  private apiUrl = 'https://wqzospohaepzbfqbwjca.supabase.co/';

  get<T>(endpoint: string) {
    return this.httpClient.get<T>(`${this.apiUrl}${endpoint}`);
  }

  post<T>(endpoint: string, data: unknown) {
    return this.httpClient.post<T>(`${this.apiUrl}${endpoint}`, data);
  }

  delete<T>(endpoint: string, data?: unknown) {
    return this.httpClient.delete<T>(
      `${this.apiUrl}${endpoint}`,
      data === undefined ? undefined : { body: data },
    );
  }

  put(endpoint: string, data: string) {
    return this.httpClient.put(`${this.apiUrl}${endpoint}`, data);
  }
}
