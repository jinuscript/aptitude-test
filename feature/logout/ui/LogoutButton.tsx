'use client';

import { useLogout } from "../hook/useLogout";

const LogoutButton = () => {
    const { logout } = useLogout();

    return (
        <button onClick={logout} className="cursor-pointer bg-green-500 hover:bg-green-700 rounded-lg py-2 px-3 text-white w-full font-medium transition-colors">로그아웃</button>
    )
}

export default LogoutButton;