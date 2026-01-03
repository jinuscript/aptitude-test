'use server';

interface registerAction {
    success: boolean;
    message?: string;
}

const registerAction = async (prevState: registerAction | undefined, formData: FormData): Promise<registerAction> => {
    const id = formData.get('id');
    const name = formData.get('name');
    const password = formData.get('password');

    if (!id || !name || !password) {
        return {
            success: false,
            message: '필수 정보를 입력해주세요.'
        }
    }

    return {
        success: true,
    }
}

export default registerAction;