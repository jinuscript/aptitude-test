'use client';

import { useActionState } from "react";
import loginAction from "../action/loginAction";

const LoginForm = () => {
    const [state, action, isPending] = useActionState(loginAction, undefined);

    return (
        <form action={action}>
            <div>
                <label htmlFor="id">아이디</label>
                <input
                    type="text"
                    name="id"
                    id="id"
                    aria-invalid={!!state?.message}
                    aria-describedby={state?.message ? "login-error" : undefined}
                />
            </div>
            <div>
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    aria-invalid={!!state?.message}
                    aria-describedby={state?.message ? "login-error" : undefined}
                />
            </div>
            <div aria-live="polite">
                {state?.message && <p id="login-error">{state.message}</p>}
            </div>
            <button type="submit" disabled={isPending}>{isPending ? '로그인 중...' : '로그인'}</button>
        </form>
    );
}

export default LoginForm;
