'use server';

interface loginAction {
    success: boolean;
    message?: string;
}

const loginAction = async (prevState: loginAction | undefined, formData: FormData): Promise<loginAction> => {
    const id = formData.get('id');
    const password = formData.get('password');

    if (!id || !password) {
        return {
            success: false,
            message: '아이디와 비밀번호를 입력해주세요.'
        }
    }

    return {
        success: true,
    }
}

export default loginAction;