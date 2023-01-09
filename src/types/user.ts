export interface IUserLocalStorage {
    token: string
    id: number
    date_registered: string
    display_name: string | null
    message: string
    wallet_address: string
}

export interface IUserAuthTokenDecoded {
    exp: number
    iat: number
    wallet_address: string
    signature: string
}
