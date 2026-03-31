import { NextResponse } from 'next/server';

import { createAccessToken, createRefreshToken } from '../shared/utils/token';

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id: user_id, password } = body;

        // 입력값 확인
        if (!user_id || !password) {
            return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_INPUT.code, message: ERROR_MESSAGES.INVALID_INPUT.message, details: [] } }, { status: 400 });
        }

        // DB에서 사용자 확인 및 비밀번호 비교
        const allUsers = await readJsonDb('app/api/database/data/user.json');
        const user = allUsers.find((u: { user_id: string }) => u.user_id === user_id);

        if (!user || user.password !== password) {
            return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.AUTH_FAILED.code, message: ERROR_MESSAGES.AUTH_FAILED.message, details: [] } }, { status: 401 });
        }

        // JWT 토큰 생성
        const accessToken = await createAccessToken({ user_id: user.user_id, role: user.role, name: user.name });
        const refreshToken = await createRefreshToken(user.user_id);

        return NextResponse.json({ success: true, data: { user, accessToken, refreshToken }, error: null }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.SERVER_ERROR.code, message: ERROR_MESSAGES.SERVER_ERROR.message, details: [] } }, { status: 500 });
    }
}