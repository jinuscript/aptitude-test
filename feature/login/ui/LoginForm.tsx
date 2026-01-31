'use client';

import { useState, useEffect, useActionState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/widget/PrivateNavigation/model/useUserStore";
import loginAction from "../action/loginAction";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, action, isPending] = useActionState(loginAction, undefined);
    const setUser = useUserStore((state) => state.setUser);
    const { push } = useRouter();

    useEffect(() => {
        if (state?.success && state?.data) {
            setUser(state.data);
            push('/dashboard');
        }
    }, [state]);

    return (
        <form action={action}>
            {/* 아이디 */}
            <div>
                <label htmlFor="id">아이디</label>
                <input
                    type="text"
                    name="id"
                    id="id"
                    aria-invalid={!!state?.success}
                    aria-describedby={state?.success ? "login-error" : undefined}
                />
            </div>

            {/* 비밀번호 */}
            <div>
                <label htmlFor="password">비밀번호</label>
                <div>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        aria-invalid={!!state?.success}
                        aria-describedby={state?.success ? "login-error" : undefined}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
                    >
                        {showPassword ? "🙈" : "👁️"}
                    </button>
                </div>
            </div>

            {/* 에러 메시지 */}
            <div aria-live="polite">
                {state?.message && <p id="login-error">{state.message}</p>}
            </div>

            {/* 로그인 버튼 */}
            <button type="submit" disabled={isPending}>{isPending ? '로그인 중...' : '로그인'}</button>
        </form>
    );
}

export default LoginForm;
