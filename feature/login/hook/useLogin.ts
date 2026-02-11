import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/widget/PrivateNavigation/model/useUserStore";
import loginAction from "../action/loginAction";

export const useLogin = () => {
    const { replace } = useRouter();

    const [state, action, isPending] = useActionState(loginAction, undefined);
    const setUser = useUserStore((state) => state.setUser);

    // 로그인 성공 시 유저 정보 저장 및 대시보드로 이동
    useEffect(() => {
        if (state?.success && state?.data) {
            setUser(state.data);
            replace('/dashboard');
        }
    }, [state, setUser, replace]);

    return { state, action, isPending };
}