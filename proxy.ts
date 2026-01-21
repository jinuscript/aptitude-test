import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { serverClient } from './shared/api/serverClient';
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
            const response = await serverClient(`/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } } = response;

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
    ],
};