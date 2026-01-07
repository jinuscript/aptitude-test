'use server';

// import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginSchema, type LoginState } from '../model/loginModel';
import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

const loginAction = async (prevState: LoginState | undefined, formData: FormData): Promise<LoginState> => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: ERROR_MESSAGES.INVALID_INPUT,
        };
    }

    const { id, password } = validatedFields.data;

    const response = await fetch('http://localhost:3000/api/login', {
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

    redirect('/dashboard');

    // // 4. Set the Secure Session Cookies
    // if (data.accessToken && data.refreshToken) {
    //     const cookieStore = await cookies();

    //     // Access Token Cookie
    //     cookieStore.set('accessToken', data.accessToken, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         path: '/',
    //         maxAge: 15 * 60, // 15 minutes
    //     });

    //     // Refresh Token Cookie
    //     cookieStore.set('refreshToken', data.refreshToken, {
    //         httpOnly: true,
    //         secure: process.env.NODE_ENV === 'production',
    //         path: '/',
    //         maxAge: 60 * 60 * 24 * 7, // 7 days
    //     });
    // }

    // // 5. Final Success Redirection
    // redirect('/dashboard');
}

export default loginAction;