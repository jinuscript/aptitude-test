'use client';

import { useActionState } from "react";
import registerAction from "../action/registerAction";

const RegisterForm = () => {
    const [state, action, isPending] = useActionState(registerAction, undefined);

    return (
        <form action={action}>
            <div>
                <label htmlFor="name">이름</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="id">아이디</label>
                <input type="text" name="id" id="id" />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input type="password" name="password" id="password" />
            </div>
            {state?.message && <p>{state?.message}</p>}
            <button type="submit" disabled={isPending}>{isPending ? '회원가입 중...' : '회원가입'}</button>
        </form>
    );
}

export default RegisterForm;
