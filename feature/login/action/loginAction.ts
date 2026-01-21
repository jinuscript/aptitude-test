'use server';

import { setAuthCookies } from '@/shared/api/setAuthCookies';
import { redirect } from 'next/navigation';

import { HttpError } from '@/shared/api/HttpError';
import { serverClient } from '@/shared/api/serverClient';
import { LoginSchema, type LoginState } from '../model/loginModel';

const loginAction = async (prevState: LoginState | undefined, formData: FormData): Promise<LoginState | undefined> => {
    // 1. 로그인 통신
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력값이 유효하지 않습니다."
        };
    }

    const { id, password } = validatedFields.data;

    try {
        const response = await serverClient('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        // 2. 쿠키 생성
        const { data: { accessToken, refreshToken } } = response;

        if (accessToken && refreshToken) {
            await setAuthCookies(accessToken, refreshToken);
        }
    } catch (error) {
        if (!(error instanceof HttpError)) {
            return {
                success: false,
                message: "서비스가 원활하지 않습니다. 잠시 후 다시 시도해주세요."
            };
        }
        return {
            success: false,
            message: error.message,
        };
    }

    redirect('/dashboard');
}

export default loginAction;