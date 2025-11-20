import { environments } from '../../../environments/environment';

const BASE = `${environments.BaseURL}auth/`;

export const AuthApis = {
  /** Endpoint for user registration (sign-up) */
  SignUpURL: `${BASE}signup`,

  /** Endpoint for user login (sign-in) */
  SignInURL: `${BASE}signin`,

  /** Endpoint to verify the validity of a JWT token */
  VerifyToken: `${BASE}verifyToken`,
} as const;
