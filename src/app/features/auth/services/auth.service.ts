import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { filter, Observable, ReplaySubject, take, tap } from 'rxjs';
import { ISignUpData, ISignUpResponse } from '../interfaces/ISignUpUser';
import { ISignInData, ISignInResponse } from '../interfaces/ISignInUser';
import { BaseHttp } from '../../../core/services/http/baseHttp';
import { NavigationEnd, Router } from '@angular/router';
import { STORED_KEYS } from '../../../core/constants/storedKeys';
import { AuthApis } from '../auth.apis';
import { IDecodedToken, IVerifyToken } from '../interfaces/IToken';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  decodedToken: IDecodedToken | null = null;
  private readonly _ready$ = new ReplaySubject<boolean>(1);

  private readonly _Router = inject(Router);
  private readonly _BaseHttp = inject(BaseHttp);
  private readonly _platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this._platformId);
  }

  constructor() {
    // restore token & decodedToken on first navigation (refresh-safe)
    if (this.isBrowser) {
      this._Router.events
        .pipe(
          filter((e) => e instanceof NavigationEnd),
          take(1)
        )
        .subscribe(() => {
          const token = this.getToken();
          if (!token) {
            this._ready$.next(false);
            return;
          }
          this.verifyToken().subscribe({
            next: () => this._ready$.next(true),
            error: () => this._ready$.next(false),
          });
        });
    }
  }

  signUpUser(userData: ISignUpData): Observable<ISignUpResponse> {
    return this._BaseHttp.post<ISignUpResponse, ISignUpData>(
      AuthApis.SignUpURL,
      userData
    );
  }

  signInUser(userData: ISignInData): Observable<ISignInResponse> {
    return this._BaseHttp.post<ISignInResponse, ISignInData>(
      AuthApis.SignInURL,
      userData
    );
  }

  signOut(): void {
    this.clearToken();
    this._Router.navigateByUrl('/signin');
  }

  clearToken(): void {
    if (!this.isBrowser) return;
    localStorage.removeItem(STORED_KEYS.auth.token);
    this.decodedToken = null;
    this._ready$.next(false);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(STORED_KEYS.auth.token);
  }

  saveToken(token: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(STORED_KEYS.auth.token, token);
  }

  verifyToken(): Observable<IVerifyToken> {
    if (!this.isBrowser)
      return new Observable<IVerifyToken>((obs) => obs.complete());
    return this._BaseHttp
      .get<IVerifyToken>(AuthApis.VerifyToken)
      .pipe(tap((res) => (this.decodedToken = res.decoded)));
  }

  getUserId(): string | null {
    return this.decodedToken?.id ?? null;
  }

  getUserName(): string | null {
    return this.decodedToken?.name ?? null;
  }

  ready$(): Observable<boolean> {
    return this._ready$.asObservable();
  }
}
