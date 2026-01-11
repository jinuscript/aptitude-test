import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { refreshTokens } from "./refreshTokens";

export const apiClient = async (url: string, options: RequestInit = {}) => {
    // 헤더에 토큰 추가
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers = {
        ...options.headers,
    } as Record<string, string>;

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    // 통신
    let response = await fetch(process.env.BASE_URL + url, {
        ...options,
        headers,
    });


    if (response.status === 401) {
        // 액세스 토큰 만료시 사일런트 리프레쉬
        const refreshOk = await refreshTokens();

        if (refreshOk) {
            const newAccessToken = (await cookies()).get('accessToken')?.value;

            if (newAccessToken) {
                headers['Authorization'] = `Bearer ${newAccessToken}`;
            }

            // refresh 성공하면 통신 다시 수행
            response = await fetch(process.env.BASE_URL + url, {
                ...options,
                headers,
            });

        } else {
            // refresh 실패하면 로그인 페이지로 이동
            redirect('/login');
        }
    }

    return response;
}