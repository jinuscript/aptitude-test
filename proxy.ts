import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { refreshTokens } from './shared/api/refreshTokens';
import { setAuthCookies } from './shared/api/setAuthCookies';

const PUBLIC_ROUTE = ["/", "/login"]

export async function proxy(request: NextRequest) {
    // 현재 경로 확인
    const { pathname } = request.nextUrl;

    // 퍼블릭 라우트인지 확인
    const isPublicRoute = PUBLIC_ROUTE.includes(pathname);

    // 쿠키에서 토큰 가져오기
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 로그인 상태 확인
    const isLoggedIn = !!accessToken || !!refreshToken;

    // 로그인 O -> 대시보드
    if (isPublicRoute && isLoggedIn) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 로그인 X -> 퍼블릭 라우트만 허용
    if (isPublicRoute) {
        return NextResponse.next();
    }

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
        '/',
        '/login',
        '/dashboard/:path*',
        '/test/:path*',
        '/result/:path*'
    ],
};