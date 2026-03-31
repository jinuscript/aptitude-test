import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "@/app/api/backend/shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';
import { writeJsonDb } from '@/app/api/database/shared/utils/writeJsonDb';

// 질문 호출
export async function GET(request: Request, { params }: { params: Promise<{ current: string }> }) {
    const { current } = await params;
    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        await verifyAccessToken(accessToken);

        // DB에서 질문 추출 및 알고리즘 점수 제외
        const { questions: rawQuestions, options } = await readJsonDb(`app/api/database/data/questions/${current.toLowerCase()}.json`);
        const questions = rawQuestions.map(({ weights, ...rest }: any) => rest);

        return NextResponse.json({
            success: true,
            data: {
                questions,
                options
            },
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

// 정답 저장
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string, current: string }> }) {
    const { id, current } = await params;

    const userAnswers = await request.json();

    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        const { user_id: userId } = await verifyAccessToken(accessToken);

        // 사용자 답변 저장
        const allTests = await readJsonDb('app/api/database/data/test-answers.json');

        // 테스트 답변이 없으면 생성
        if (!allTests[id]) {
            allTests[id] = {
                userId: userId,
                testId: id,
                answers: {
                    STRENGTH: [],
                    INTEREST: [],
                    PERSONALITY: [],
                    VALUE: [],
                    KNOWLEDGE: [],
                }
            }
        }

        // 테스트 답변 업데이트
        allTests[id].answers[current] = userAnswers;
        await writeJsonDb('app/api/database/data/test-answers.json', allTests);

        return NextResponse.json({
            success: true,
            data: {
                answers: allTests[id].answers[current]
            },
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

//페이지 이동
export async function POST(request: Request, { params }: { params: Promise<{ id: string, current: string }> }) {
    const { id, current } = await params;

    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        const { user_id: userId } = await verifyAccessToken(accessToken);

        // 2. Navigation Logic (The Navigator)
        const summary = await readJsonDb('app/api/database/data/test-summary.json');
        const userTest = summary[userId].find((t: any) => t.testId === id);

        const currentIndex = userTest.sectionList.indexOf(current);
        const nextSection = userTest.sectionList[currentIndex + 1] || null;

        // 3. Update State
        userTest.currentSection = nextSection;
        if (nextSection) {
            userTest.status = "IN_PROGRESS";
        } else {
            userTest.status = "COMPLETED";
        }

        // 4. Save Everything
        await writeJsonDb('app/api/database/data/test-summary.json', summary);

        return NextResponse.json({
            success: true,
            data: { nextSection }
        });

    } catch (error) {
        if (error instanceof Error) {
            if (error.message === "INVALID_TOKEN") {
                return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.INVALID_TOKEN.code, message: ERROR_MESSAGES.INVALID_TOKEN.message, details: [] } }, { status: 401 });
            }
        }
        return NextResponse.json({ success: false, data: null, error: { code: ERROR_MESSAGES.SERVER_ERROR.code, message: ERROR_MESSAGES.SERVER_ERROR.message, details: [] } }, { status: 500 });
    }
}