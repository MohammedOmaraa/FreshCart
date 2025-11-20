export interface IDecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

export interface IVerifyToken {
  message: string;
  decoded: Decoded;
}

interface Decoded {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}
