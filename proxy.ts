import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { JWT_SECRET } from '@/shared/constants/auth';

export async function proxy(request: NextRequest) {
    const accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;
    const { pathname } = request.nextUrl;

    // 1. 액세스 토큰이 없고 리프레쉬 토큰만 있는 경우 (Silent Refresh 대상)
    if (!accessToken && refreshToken) {
        try {
            // 리프레쉬 토큰 검증
            await jwtVerify(refreshToken, JWT_SECRET);

            // API를 통해 새로운 토큰 발급 받기 (절대 경로 필수)
            const refreshResponse = await fetch(new URL('/api/refresh', request.url), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshToken }),
            });

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                const response = NextResponse.next();

                // 새로운 액세스 토큰을 쿠키에 설정
                response.cookies.set('accessToken', data.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    path: '/',
                    maxAge: 15 * 60,
                });

                // (선택) 리프레쉬 토크도 로테이션 했다면 갱신
                if (data.refreshToken) {
                    response.cookies.set('refreshToken', data.refreshToken, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        path: '/',
                        maxAge: 60 * 60 * 24 * 7,
                    });
                }

                console.log('🔄 Middleware: Silent Refresh Successful for', pathname);
                return response;
            }
        } catch (error) {
            console.error('❌ Middleware: Refresh failure, clearing cookies:', error);
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('accessToken');
            response.cookies.delete('refreshToken');
            return response;
        }
    }

    // 2. 보호된 경로에 대한 접근 제어 (액세스/리프레쉬 둘 다 없는 경우)
    if (!accessToken && !refreshToken && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

// 미들웨어가 실행될 경로 설정
export const config = {
    matcher: [
        '/dashboard/:path*',
    ],
};
