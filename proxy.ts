import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
    // 토큰 여부 확인
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    // 1. 토큰이 둘 다 없으면 로그인 페이지로 리다이렉트
    if (!accessToken && !refreshToken) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. 액세스 토큰은 없으나 리프레쉬 토큰이 있는 경우 (사일런트 리프레쉬)
    if (!accessToken && refreshToken) {
        try {
            const response = await fetch(`${new URL(request.url).origin}/api/refresh`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if (response.ok) {
                const data = await response.json();
                const { accessToken: newAccess, refreshToken: newRefresh } = data;

                const nextResponse = NextResponse.next();

                // 새로운 토큰들을 쿠키에 설정
                const cookieOptions = {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax' as const,
                    path: '/',
                };

                nextResponse.cookies.set('accessToken', newAccess, {
                    ...cookieOptions,
                    maxAge: 15 * 60,
                });
                nextResponse.cookies.set('refreshToken', newRefresh, {
                    ...cookieOptions,
                    maxAge: 60 * 60 * 24 * 7,
                });

                return nextResponse;
            }
        } catch (error) {
            console.error('Middleware refresh error:', error);
        }

        // 리프레쉬 실패 시 로그인 페이지로
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};