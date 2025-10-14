import { ISignUpResponse, ISignUpData } from './ISignUpUser';

// same properties interfaces
export interface ISignInResponse extends ISignUpResponse {}
export interface ISignInData extends ISignUpData {}
