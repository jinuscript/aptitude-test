'use client';

import { useState } from "react";
import { useLogin } from "../hook/useLogin";

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { state, action, isPending } = useLogin();

    return (
        <form action={action} className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-6">
                {/* 아이디 */}
                <div className="flex flex-col gap-2 max-w-[320px] w-full mx-auto">
                    <label htmlFor="id" className="text-[#2a2e35] font-medium">아이디</label>
                    <input
                        className="text-[#2a2e35] py-3 px-4 rounded-lg border-[#e5e1da] border"
                        type="text"
                        name="id"
                        id="id"
                        aria-invalid={!!state?.success}
                        aria-describedby={state?.success ? "login-error" : undefined}
                    />
                </div>

                {/* 비밀번호 */}
                <div className="flex flex-col gap-2 max-w-[320px] w-full mx-auto">
                    <label htmlFor="password" className="text-[#2a2e35] font-medium">비밀번호</label>
                    <div className="flex gap-2 relative">
                        <input
                            className="text-[#2a2e35] py-3 px-4 rounded-lg border-[#e5e1da] border w-full"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            aria-invalid={!!state?.success}
                            aria-describedby={state?.success ? "login-error" : undefined}
                        />
                        <button
                            className="absolute right-4 top-1/2 -translate-y-1/2"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보이기"}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* 에러 메시지 */}
                <div aria-live="polite" className="max-w-[320px] w-full mx-auto">
                    {state?.message && <p id="login-error" className="text-[#ff0000] text-sm">{state.message}</p>}
                </div>
            </div>


            {/* 로그인 버튼 */}
            <button
                className="max-w-[320px] w-full mx-auto py-3 px-4 rounded-lg bg-[#626A76] text-[#fcf9f5] font-semibold cursor-pointer"
                type="submit" disabled={isPending}>{isPending ? '로그인 중...' : '로그인'}</button>
        </form >
    );
}

export default LoginForm;
