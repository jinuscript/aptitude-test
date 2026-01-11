import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    // 토큰 여부 확인
    const hasAccess = request.cookies.has('accessToken');
    const hasRefresh = request.cookies.has('refreshToken');

    // 토큰이 없으면 로그인 페이지로 리다이렉트
    if (!hasAccess && !hasRefresh) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};