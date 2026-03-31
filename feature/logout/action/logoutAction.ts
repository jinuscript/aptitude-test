'use server';

import { cookies } from "next/headers";
import { serverClient } from "@/shared/api/serverClient";

export const logoutAction = async () => {
    const cookieStore = await cookies();

    // 로그아웃 통신
    const result = await serverClient('/logout', {
        method: 'POST',
    });

    // 쿠키 삭제
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return {
        success: true,
        message: '로그아웃 성공'
    }
}