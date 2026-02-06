import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "@/app/api/backend/shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';
import { writeJsonDb } from '@/app/api/database/shared/utils/writeJsonDb';

export async function POST(request: Request) {

    const body = await request.json();
    // const { code } = body;

    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        const payload = await verifyAccessToken(accessToken);

        const newTestSummary = {
            testId: crypto.randomUUID(),
            userId: payload.user_id,
            code: "MID",
            currentSection: null,
            totalSection: 5,
            purchaseDate: new Date().toISOString(),
            status: "NOT_STARTED"
        }

        // DB에서 전체 테스트 요약 정보 조회
        const testSummary = await readJsonDb('app/api/database/data/test-summary.json');

        // 특정 사용자의 테스트 목록에 새 항목 추가
        const userTestSummary = testSummary[payload.user_id] || [];
        testSummary[payload.user_id] = [...userTestSummary, newTestSummary];

        // 업데이트된 정보 저장
        await writeJsonDb('app/api/database/data/test-summary.json', testSummary);

        return NextResponse.json({
            success: true,
            data: newTestSummary,
            error: null
        }, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "INVALID_TOKEN") {
                return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
            }
        }
        return NextResponse.json({
            success: false,
            data: null,
            error: {
                code: ERROR_MESSAGES.SERVER_ERROR.code,
                message: ERROR_MESSAGES.SERVER_ERROR.message,
                details: []
            }
        },
            { status: 500 });
    }
}