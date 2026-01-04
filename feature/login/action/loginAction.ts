'use server';

import { LoginSchema, type LoginState } from '../model/schema';

const loginAction = async (prevState: LoginState | undefined, formData: FormData): Promise<LoginState> => {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = LoginSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: '아이디 또는 비밀번호를 확인해주세요.',
        };
    }

    return {
        success: true,
    }
}

export default loginAction;