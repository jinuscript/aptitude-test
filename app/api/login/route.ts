// import fs from 'fs/promises';
// import path from 'path';
// import { SignJWT } from 'jose';

// import { NextResponse } from 'next/server';

// const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-fallback-secret');


// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const { id, password } = body;

//         // 백엔드 로직
//         const DB_PATH = path.join(process.cwd(), 'db/users.json');
//         const users = await fs.readFile(DB_PATH, 'utf-8');
//         const usersData = JSON.parse(users);

//         const user = usersData.find((user: { id: string; password: string; }) => user.id === id);

//         // 401 에러
//         if (!user || user.password !== password) {
//             return NextResponse.json(
//                 { message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
//                 { status: 401 }
//             );
//         }

//         // 1. Access Token (Short-lived: 15min)
//         const accessToken = await new SignJWT({ id: user.id })
//             .setProtectedHeader({ alg: 'HS256' })
//             .setIssuedAt()
//             .setExpirationTime('15m')
//             .sign(SECRET);

//         // 2. Refresh Token (Long-lived: 7days)
//         const refreshToken = await new SignJWT({ id: user.id })
//             .setProtectedHeader({ alg: 'HS256' })
//             .setIssuedAt()
//             .setExpirationTime('7d')
//             .sign(SECRET);

//         return NextResponse.json({
//             success: true,
//             user: {
//                 id: user.id,
//                 name: user.name
//             },
//             accessToken,
//             refreshToken
//         });

//     } catch (error) {
//         return NextResponse.json(
//             { message: '서버 오류가 발생했습니다.' },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from 'next/server';

import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, password } = body;

        if (!id || !password) {
            return NextResponse.json({ message: ERROR_MESSAGES.INVALID_INPUT }, { status: 400 });
        }

        if (id !== 'test' || password !== '12345678') {
            return NextResponse.json({ message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}