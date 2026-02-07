import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "@/app/api/backend/shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';
import { writeJsonDb } from '@/app/api/database/shared/utils/writeJsonDb';

export async function POST(request: Request) {

    const body = await request.json();
    const { code, totalSection } = body;

    try {
        // 액세스 토큰 추출 및 검증
        const accessToken = getAccessToken(request);

        const payload = await verifyAccessToken(accessToken);

        // 상품 정보 조회
        const product = await readJsonDb('app/api/database/data/product.json');
        const productData = product.find((item: any) => item.code === code);

        // 새로운 검사 요약 정보 생성
        const newTestSummary = {
            testId: crypto.randomUUID(),
            userId: payload.user_id,
            code: productData.code,
            currentSection: productData.sectionList[0],
            totalSection: productData.sectionList.length,
            purchaseDate: new Date().toISOString(),
            status: "NOT_STARTED"
        }

        const testSummary = await readJsonDb('app/api/database/data/test-summary.json');

        const userTestSummary = testSummary[payload.user_id];
        testSummary[payload.user_id] = [...userTestSummary, newTestSummary];

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