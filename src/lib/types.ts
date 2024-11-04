export interface JwtPayload {
    role: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;

}
