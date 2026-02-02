import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { HttpError } from './shared/api/HttpError';
import { setAuthCookies } from './shared/api/setAuthCookies';

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 토큰 X -> 로그인
    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 리프레쉬만 O -> 사일런트 리프레쉬
    if (!accessToken && refreshToken) {
        try {
            // 런타임 에러 방지를 위해 serverClient 사용X
            const response = await fetch(`${process.env.BASE_URL}/backend/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new HttpError(response.status, result.error.code, result.error.message);
            }

            const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } } = result;

            const nextResponse = NextResponse.next();

            await setAuthCookies(nextResponse.cookies, newAccessToken, newRefreshToken);

            return nextResponse;
        } catch (error) {
            console.error(error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/test/:path*',
        '/result/:path*'
    ],
};