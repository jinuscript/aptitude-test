'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginSchema, type LoginState } from '../model/loginModel';
import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

const loginAction = async (prevState: LoginState | undefined, formData: FormData): Promise<LoginState> => {
    // 1. 로그인 통신
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: ERROR_MESSAGES.INVALID_INPUT,
        };
    }

    const { id, password } = validatedFields.data;

    const response = await fetch(`${process.env.BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        return {
            success: false,
            message: data.message,
        };
    }

    // 2. 쿠키 생성
    if (data.accessToken && data.refreshToken) {
        const cookieStore = await cookies();

        cookieStore.set('accessToken', data.accessToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 15 * 60,
        });

        cookieStore.set('refreshToken', data.refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
        });
    }

    // 3. redirect
    redirect('/dashboard');
}

export default loginAction;