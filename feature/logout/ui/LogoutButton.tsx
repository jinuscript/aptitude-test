'use client';

import { useLogout } from "../hook/useLogout";

const LogoutButton = () => {
    const { logout } = useLogout();

    return (
        <button onClick={logout}>로그아웃</button>
    )
}

export default LogoutButton;