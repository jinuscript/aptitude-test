import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshTokens } from './shared/api/refreshTokens';
import { setAuthCookies } from './shared/api/setAuthCookies';

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 액세스 토큰, 리프레쉬 토큰 모두 없을 때 -> 로그인
    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 리프레쉬만 있을 때 -> 사일런트 리프레쉬
    if (!accessToken && refreshToken) {
        try {
            // 리프레쉬 토큰으로 토큰 갱신
            const result = await refreshTokens(refreshToken);
            const { data: { accessToken: newAccessToken, refreshToken: newRefreshToken } } = result;

            // 쿠키 저장
            const nextResponse = NextResponse.next();
            await setAuthCookies(nextResponse.cookies, newAccessToken, newRefreshToken);
            return nextResponse;
        } catch (error) {
            // 리프레쉬 토큰 만료 -> 로그인
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