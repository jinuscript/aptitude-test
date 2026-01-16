import { NextResponse } from 'next/server';

import { SignJWT } from 'jose';

import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';
import { findUserById } from '@/database/feature/findUserById';

// JWT 토큰 시그니처
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id: user_id, password } = body;

        // 입력값 확인
        if (!user_id || !password) {
            return NextResponse.json({ success: false, message: ERROR_MESSAGES.INVALID_INPUT }, { status: 400 });
        }

        // DB 로직
        const user = await findUserById(user_id);

        // 유저 정보 확인
        if (!user || user.password !== password) {
            return NextResponse.json({ success: false, message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        // JWT 토큰 생성 
        const accessToken = await new SignJWT({ user_id: user.user_id, role: user.role, name: user.name })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(JWT_SECRET);

        const refreshToken = await new SignJWT({ user_id: user.user_id, sid: "MOCK_SID" })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        return NextResponse.json({ success: true, user, accessToken, refreshToken }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, message: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}