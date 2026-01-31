'use client';

import { useEffect, useState } from "react";
import { useUserStore } from "../model/useUserStore";

const UserProfile = () => {
    const user = useUserStore((state) => state.user);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div>
            {user?.name}
        </div>
    );
};

export default UserProfile;