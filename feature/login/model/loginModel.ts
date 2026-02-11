import { z } from 'zod';

export const LoginSchema = z.object({
    id: z.string().trim().min(1),
    password: z.string().min(8),
});

export type LoginState = {
    success: boolean;
    data?: any;
    message?: string;
};
