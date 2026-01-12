import fs from 'fs/promises';
import path from 'path';

import { NextResponse } from "next/server";
import { ERROR_MESSAGES } from "@/shared/constants/errorMessages";

import { jwtVerify } from 'jose';

import { JWT_SECRET } from '@/shared/constants/auth';

export async function GET(request: Request) {
    try {
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

        // 3. DB 로직
        const DB_PATH = path.join(process.cwd(), 'db/purchase.json');
        const purchase = await fs.readFile(DB_PATH, 'utf-8');
        const purchaseData = JSON.parse(purchase);

        const userPurchase = purchaseData[payload.id];

        return NextResponse.json({ user_purchase: userPurchase }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}