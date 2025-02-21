import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

export const createToken = (jwtPayload: { name: string; email: string; role: string }, secret: string, expiresIn: string) => {
    return jwt.sign(jwtPayload, secret, { expiresIn } as SignOptions);
};

export const verifyToken = (token: string, secret: string) => {
    return jwt.verify(token, secret) as JwtPayload;
};
