export interface IUserLocalStorage {
  token: string;
  wallet_address: string;
}

export interface IUserAuthTokenDecoded {
  exp: number;
  iat: number;
  wallet_address: string;
  signature: string;
}
