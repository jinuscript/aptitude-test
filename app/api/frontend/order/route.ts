import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

import { ERROR_MESSAGES } from '@/shared/constants/errorMessages';

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (!accessToken) {
            return NextResponse.json({ message: ERROR_MESSAGES.AUTH_FAILED }, { status: 401 });
        }

        const response = await fetch(`${process.env.BASE_URL}/backend/order`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message);
        }

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}