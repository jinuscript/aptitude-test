import { useRouter } from "next/navigation";

import { logoutAction } from "../action/logoutAction";
import { useUserStore } from "@/widget/PrivateNavigation/model/useUserStore";


export const useLogout = () => {
    const router = useRouter();
    const { clearUser } = useUserStore();

    const logout = async () => {
        await logoutAction();

        clearUser();
        router.push('/');
    }

    return {
        logout
    }
}