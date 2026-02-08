import { NextResponse } from "next/server";

import { ERROR_MESSAGES } from '@/app/api/backend/shared/constants/errorMessages';
import { getAccessToken, verifyAccessToken } from "@/app/api/backend/shared/utils/token";

import { readJsonDb } from '@/app/api/database/shared/utils/readJsonDb';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        // 액세스 토큰 추출& 검증
        const accessToken = getAccessToken(request);

        // 액세스 토큰 검증
        await verifyAccessToken(accessToken);

        // DB에서 사용자 답안 조회
        const allAnswersData = await readJsonDb('app/api/database/data/test-answers.json');
        const userTestData = allAnswersData[id];

        if (!userTestData) {
            return NextResponse.json({ success: false, data: null, error: { code: "NOT_FOUND", message: "테스트 결과를 찾을 수 없습니다.", details: [] } }, { status: 404 });
        }

        const userAnswersMap = userTestData.answers;

        // 모든 질문 데이터 로드 (분산된 파일들을 하나로 합침)
        const [strength, interest, personality, value, knowledge] = await Promise.all([
            readJsonDb('app/api/database/data/questions/strength.json'),
            readJsonDb('app/api/database/data/questions/interest.json'),
            readJsonDb('app/api/database/data/questions/personality.json'),
            readJsonDb('app/api/database/data/questions/value.json'),
            readJsonDb('app/api/database/data/questions/knowledge.json')
        ]);

        const allQuestions = [
            ...strength.questions,
            ...interest.questions,
            ...personality.questions,
            ...value.questions,
            ...knowledge.questions
        ];

        const categoryScores: Record<string, number> = {
            engineering: 0, science: 0, medical: 0, business: 0,
            humanities: 0, education: 0, arts: 0
        };

        const majorScores: Record<string, number> = {};

        // 2. 답변 데이터 순회하며 점수 누적
        // userAnswersMap은 { "STRENGTH": [...], "INTEREST": [...] } 형태임
        Object.values(userAnswersMap).flat().forEach((userAns: any) => {
            const question = allQuestions.find(q => q.id === userAns.id);
            if (!question) return;

            const answerValue = userAns.value; // 사용자가 선택한 값 (1~5점)

            // 계열 가중치(weights) 계산
            for (const [category, weight] of Object.entries(question.weights)) {
                if (categoryScores[category] !== undefined) {
                    categoryScores[category] += answerValue * (weight as number);
                }
            }

            // 세부 전공 가중치(sub_weights) 계산
            if (question.sub_weights) {
                for (const [major, subWeight] of Object.entries(question.sub_weights)) {
                    if (!majorScores[major]) majorScores[major] = 0;
                    majorScores[major] += answerValue * (subWeight as number);
                }
            }
        });

        // 3. 결과 정렬 및 가공
        const majorDataByCat = await readJsonDb('app/api/database/data/major.json');
        const categoryData = await readJsonDb('app/api/database/data/category.json');

        // 모든 계열을 순회하며 전공 ID와 한국어 명칭을 평탄화(Flatten)
        const flatMajorData: Record<string, string> = {};
        Object.values(majorDataByCat).forEach((majors: any) => {
            Object.entries(majors).forEach(([id, name]) => {
                flatMajorData[id] = name as string;
            });
        });

        const sortedCategories = Object.entries(categoryScores)
            .sort((a, b) => b[1] - a[1])
            .map(([id, score]) => ({
                id,
                score,
                name: categoryData[id] || id
            }));

        const sortedMajors = Object.entries(majorScores)
            .sort((a, b) => b[1] - a[1])
            .map(([id, score]) => ({
                id,
                score,
                name: flatMajorData[id] || id
            }));

        return NextResponse.json({
            success: true,
            data: {
                categories: sortedCategories,
                majors: sortedMajors,
                testId: id,
                userId: userTestData.userId
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