import 'server-only';

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

import { HttpError } from './HttpError';

export const serverClient = async (url: string, options: RequestInit = {}) => {
    // 쿠키 조회 및 헤더 설정
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers = {
        ...options.headers,
    } as Record<string, string>;

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    try {
        // API 호출
        const response = await fetch(`${process.env.BASE_URL}/backend${url}`, {
            ...options,
            headers,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new HttpError(response.status, result.error.code, result.error.message);
        }

        return result;
    } catch (error) {
        if (error instanceof HttpError) {
            if (error.status === 401) {
                redirect('/login');
            }
        }
    }
}