import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';
import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { JWT_SECRET } from "@/app/api/backend/shared/constants/jwtSecret";

export async function GET(request: Request) {
    try {
        // 액세스 토큰 추출
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.substring(7);

        if (!token) {
            return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
        }

        // 액세스 토큰 검증
        const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: { user_id: string } };

        // DB에서 사용자 테스트 정보 조회
        const allTests = await readJsonDb('app/api/database/data/test.json');
        const userTests = allTests[payload.user_id];

        return NextResponse.json({
            success: true,
            data: userTests,
            error: null
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.SERVER_ERROR.code, message: ERROR_MESSAGES.SERVER_ERROR.message, details: [] } }, { status: 500 });
    }
}