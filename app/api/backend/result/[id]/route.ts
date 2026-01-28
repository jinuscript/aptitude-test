import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "@/app/api/backend/shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';

export async function GET(request: Request) {
    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        await verifyAccessToken(accessToken);

        // DB에서 사용자 테스트 결과 조회
        const result = await readJsonDb('app/api/database/data/result.json');

        return NextResponse.json({
            success: true,
            data: result,
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