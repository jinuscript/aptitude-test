import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';
import { readJsonDb } from "@/database/shared/readJsonDb";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(
    request: Request,
    { params }: { params: Promise<{ part: string }> }
) {
    const { part } = await params;

    try {
        // 1. 액세스 토큰 추출
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.substring(7);

        if (!token) {
            return NextResponse.json({ message: "액세스 토큰이 없습니다." }, { status: 401 });
        }

        // 2. 액세스 토큰 검증
        const { payload } = await jwtVerify(token, JWT_SECRET) as { payload: { user_id: string } };

        if (!payload) {
            return NextResponse.json({ message: "액세스 토큰이 유효하지 않습니다." }, { status: 401 });
        }

        // 3. DB 로직
        const questions = await readJsonDb("database/questions.json");
        const questionsByPart = questions[part];

        return NextResponse.json({
            questionsByPart
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "서버 오류" }, { status: 500 });
    }
}