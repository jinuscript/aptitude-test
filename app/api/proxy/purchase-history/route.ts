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

        const response = await fetch(`${process.env.BASE_URL}/purchase-history`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Backend returned status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: ERROR_MESSAGES.SERVER_ERROR }, { status: 500 });
    }
}