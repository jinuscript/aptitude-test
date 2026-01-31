'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const useMobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // 모바일 메뉴 열기/닫기
    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);

    // 라우트 변경하면 모바일 메뉴 닫음
    useEffect(() => {
        closeMenu();
    }, [pathname]);

    // 데스크톱 화면 크기 이상이면 모바일 메뉴 닫음
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                closeMenu();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        isOpen,
        openMenu,
        closeMenu,
    };
};
