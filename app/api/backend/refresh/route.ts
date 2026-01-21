import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { createAccessToken, createRefreshToken } from '../shared/utils/token';

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { JWT_SECRET } from '@/app/api/backend/shared/constants/jwtSecret';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { refreshToken } = body;

        // 입력값 확인
        if (!refreshToken) {
            return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
        }

        // 리프레쉬 토큰 검증 - 실패하면 바로 catch로 이동
        const { payload } = await jwtVerify(refreshToken, JWT_SECRET)

        // DB에서 사용자 정보 조회
        const userId = payload.user_id;

        const allUsers = await readJsonDb('app/api/database/data/user.json');
        const user = allUsers.find((u: { user_id: string }) => u.user_id === userId);

        if (!user) {
            return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
        }

        // JWT 토큰 생성
        const accessToken = await createAccessToken({ user_id: user.user_id, role: user.role, name: user.name });
        const newRefreshToken = await createRefreshToken(user.user_id);

        return NextResponse.json({
            success: true,
            data: {
                accessToken,
                refreshToken: newRefreshToken
            },
            error: null
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
    }
}
