'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { serverClient } from '@/shared/api/serverClient';
import { LoginSchema, type LoginState } from '../model/loginModel';
import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

const loginAction = async (prevState: LoginState | undefined, formData: FormData): Promise<LoginState | undefined> => {
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

    let isSuccess = false;

    try {
        const response = await serverClient('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        // 2. 쿠키 생성
        if (data.accessToken && data.refreshToken) {
            const cookieStore = await cookies();

            cookieStore.set('accessToken', data.accessToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60,
            });

            cookieStore.set('refreshToken', data.refreshToken, {
                httpOnly: true,
                sameSite: "lax",
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }

        isSuccess = true;

    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    if (isSuccess) {
        redirect('/dashboard');
    }

}

export default loginAction;