import { HttpError } from "./HttpError";

export const refreshTokens = async (refreshToken: string) => {
    const response = await fetch(`${process.env.BASE_URL}/backend/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();

    if (!response.ok) {
        throw new HttpError(
            response.status,
            result.error.code,
            result.error.message
        );
    }

    return result;
};