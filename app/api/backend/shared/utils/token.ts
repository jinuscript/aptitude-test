import { SignJWT, jwtVerify } from 'jose';
import { JWT_SECRET } from '../constants/jwtSecret';
import { ERROR_MESSAGES } from '../constants/errorMessages';

interface UserPayload {
    user_id: string;
    role?: string;
    name?: string;
}

export const getAccessToken = (request: Request) => {
    const authHeader = request.headers.get('Authorization');
    const accessToken = authHeader?.substring(7);

    if (!accessToken) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN.code);
    }

    return accessToken;
};

export const verifyAccessToken = async (accessToken: string) => {
    try {
        const { payload } = await jwtVerify(accessToken, JWT_SECRET);
        return payload as unknown as UserPayload;
    } catch (error) {
        throw new Error(ERROR_MESSAGES.INVALID_TOKEN.code);
    }
};

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
