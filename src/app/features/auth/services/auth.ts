import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISignUpData, ISignUpResponse } from '../interfaces/ISignUpUser';
import { ISignInData, ISignInResponse } from '../interfaces/ISignInUser';
import { AppApis } from '../../../core/constants/appApis';
import { BaseHttp } from '../../../core/services/http/baseHttp';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  private readonly _BaseHttp = inject(BaseHttp);

  signUpUser(userData: ISignUpData): Observable<ISignUpResponse> {
    return this._BaseHttp.post<ISignUpResponse, ISignUpData>(
      AppApis.SignUpURL,
      userData
    );
  }

  signInUser(userData: ISignInData): Observable<ISignInResponse> {
    return this._BaseHttp.post<ISignInResponse, ISignInData>(
      AppApis.SignInURL,
      userData
    );
  }
}
