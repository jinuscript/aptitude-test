'use server';

import { cookies } from 'next/headers';

import { HttpError } from '@/shared/api/HttpError';
import { serverClient } from '@/shared/api/serverClient';
import { setAuthCookies } from '@/shared/api/setAuthCookies';
import { LoginSchema, type LoginState } from '../model/loginModel';

const loginAction = async (_: LoginState | undefined, formData: FormData): Promise<LoginState | undefined> => {
    // 입력값 검증
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력값이 유효하지 않습니다."
        };
    }

    const { id, password } = validatedFields.data;

    // 로그인 통신
    try {
        const result = await serverClient('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        // 쿠키 생성
        const { data: { user, accessToken, refreshToken } } = result;

        if (accessToken && refreshToken) {
            await setAuthCookies(await cookies(), accessToken, refreshToken);
        }

        return {
            success: true,
            data: user
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
}

export default loginAction;