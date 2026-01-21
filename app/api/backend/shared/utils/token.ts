import { SignJWT } from 'jose';
import { JWT_SECRET } from '../constants/jwtSecret';

interface UserPayload {
    user_id: string;
    role?: string;
    name?: string;
}

export const createAccessToken = (user: UserPayload) => {
    return new SignJWT({ user_id: user.user_id, role: user.role, name: user.name })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1h')
        .sign(JWT_SECRET);
};

export const createRefreshToken = (user_id: string) => {
    return new SignJWT({ user_id, sid: "MOCK_SID" })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(JWT_SECRET);
};
