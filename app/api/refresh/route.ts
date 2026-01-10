import { NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';
import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

import { JWT_SECRET } from '@/shared/constants/auth';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        if (!refreshToken) {
            return NextResponse.json({ message: ERROR_MESSAGES.EXPIRED_TOKEN }, { status: 401 });
        }

        // 1. 리프레쉬 토큰 검증
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET);
        const userId = payload.id as string;

        // 2. 새로운 액세스 토큰 생성
        const accessToken = await new SignJWT({ id: userId, role: payload.role }) // 실제로는 DB에서 정보를 다시 가져오는 게 정석입니다.
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(JWT_SECRET);

        // 3. 새로운 리프레쉬 토큰 생성
        const newRefreshToken = await new SignJWT({ id: userId, sid: payload.sid })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(JWT_SECRET);

        return NextResponse.json({
            success: true,
            accessToken,
            refreshToken: newRefreshToken
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: ERROR_MESSAGES.EXPIRED_TOKEN }, { status: 401 });
    }
}
