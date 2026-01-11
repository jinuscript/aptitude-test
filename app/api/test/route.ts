import { NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import { JWT_SECRET } from '@/shared/constants/auth';

export const GET = async (request: Request) => {
    // 1. 액세스 토큰 추출
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.substring(7);

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // 2. 액세스 토큰 검증
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // 3. 데이터 반환
    return NextResponse.json({
        message: 'Hello, authenticated user!',
    });
};