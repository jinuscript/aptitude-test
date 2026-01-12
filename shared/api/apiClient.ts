import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const apiClient = async (url: string, options: RequestInit = {}) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers = {
        ...options.headers,
    } as Record<string, string>;

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(process.env.BASE_URL + url, {
        ...options,
        headers,
    });

    // 만약 미들웨어를 통과했음에도 불구하고 401이 발생한다면 세션이 완전히 만료된 것임
    if (response.status === 401) {
        redirect('/login');
    }

    return response;
}