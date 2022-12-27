export interface IUserLocalStorage {
  token: string;
  wallet_address: string;
}

export interface ITokenDecoded {
  exp: number;
  iat: number;
  wallet_address: string;
  signature: string;
}
