import 'server-only';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const serverClient = async (url: string, options: RequestInit = {}) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    const headers = {
        ...options.headers,
    } as Record<string, string>;

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(`${process.env.BASE_URL}/backend${url}`, {
        ...options,
        headers,
    });

    return response;
}