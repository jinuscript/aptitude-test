interface CookieStore {
    set: (name: string, value: string, options: any) => void;
}

export const setAuthCookies = async (cookieStore: CookieStore, accessToken: string, refreshToken: string) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax' as const,
        path: '/',
    };

    cookieStore.set('accessToken', accessToken, {
        ...cookieOptions,
        maxAge: 60 * 60, // 1 hour
    });

    cookieStore.set('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
};
