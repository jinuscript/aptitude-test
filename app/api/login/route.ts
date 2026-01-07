import { NextResponse } from 'next/server';

import fs from 'fs/promises';
import path from 'path';

import { SignJWT } from 'jose';

import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';
import { type User } from '@/shared/types/User';

// JWT 토큰 시그니처
const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, password } = body;

        if (!id || !password) {
            return NextResponse.json({ message: ERROR_MESSAGES.INVALID_INPUT }, { status: 400 });
        }

        // DB 로직
        const DB_PATH = path.join(process.cwd(), 'db/users.json');
        const users = await fs.readFile(DB_PATH, 'utf-8');
        const usersData = JSON.parse(users);

        const user = usersData.find((user: User) => user.id === id);

        // 유저 정보 확인
        if (!user || user.password !== password) {
            return NextResponse.json({ message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        // JWT 토큰 생성 로직
        const accessToken = await new SignJWT({ id: user.id, role: user.role, name: user.name })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('15m')
            .sign(SECRET);

        const refreshToken = await new SignJWT({ id: user.id })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('7d')
            .sign(SECRET);

        return NextResponse.json({ success: true, accessToken, refreshToken }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}