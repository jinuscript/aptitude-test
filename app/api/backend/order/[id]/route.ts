import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import { getUserOrderHistory } from "@/database/feature/getUserOrderHistory";
import { ERROR_MESSAGES } from "@/shared/constants/errorMessages";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        // 1. 액세스 토큰 추출
        const authHeader = request.headers.get('Authorization');
        const token = authHeader?.substring(7);

        if (!token) {
            return NextResponse.json({ message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        // 2. 액세스 토큰 검증
        const { payload }: { payload: { user_id: string } } = await jwtVerify(token, JWT_SECRET);

        if (!payload) {
            return NextResponse.json({ message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        // 3. DB 로직
        const userOrderHistory = await getUserOrderHistory(payload.user_id) || [];
        const order = userOrderHistory.find(order => order.id === Number(id));

        if (!order) {
            return NextResponse.json({ message: "상품 없음" }, { status: 404 });
        }

        return NextResponse.json({
            order
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}