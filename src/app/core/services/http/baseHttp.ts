import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseHttp {
  private readonly _HttpClient = inject(HttpClient);

  get<T>(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T> {
    return this._HttpClient.get<T>(url, options);
  }

  post<T, D>(
    url: string,
    body: D,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T> {
    return this._HttpClient.post<T>(url, body, options);
  }

  put<T, D>(
    url: string,
    body: D,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T> {
    return this._HttpClient.put<T>(url, body, options);
  }

  delete<T>(
    url: string,
    options?: { headers?: HttpHeaders; params?: HttpParams }
  ): Observable<T> {
    return this._HttpClient.delete<T>(url, options);
  }
}
