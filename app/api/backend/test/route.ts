import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "../shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';

export async function GET(request: Request) {
    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        const payload = await verifyAccessToken(accessToken);

        // DB에서 사용자 테스트 정보 조회
        const allTests = await readJsonDb('app/api/database/data/test-summary.json');
        const userTests = allTests[payload.user_id];

        return NextResponse.json({
            success: true,
            data: userTests,
            error: null
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "INVALID_TOKEN") {
                return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
            }
        }
        return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.SERVER_ERROR.code, message: ERROR_MESSAGES.SERVER_ERROR.message, details: [] } }, { status: 500 });
    }
}