'use client';

import Link from "next/link";
import { useMobileMenu } from "../model/useMobileMenu";
import MobileMenu from "./MobileMenu";

const NavigationBar = () => {
    const { isOpen, openMenu, closeMenu } = useMobileMenu();

    return (
        <nav className="flex justify-between items-center max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8 py-2 fixed top-0 right-0 left-0 z-0">
            {/* 로고 */}
            <Link href="/" className="inline-block text-lg font-bold px-3 py-2">
                AI TEST
            </Link>

            {/* 데스크톱 메뉴 */}
            <ul className="hidden gap-4 lg:flex">
                <li><Link href="/login" className="inline-block text-lg font-medium px-3 py-2">로그인</Link></li>
            </ul>

            {/* 모바일 메뉴 버튼 */}
            <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="메뉴 열기"
                onClick={openMenu}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* 모바일 사이드 메뉴 */}
            <MobileMenu isOpen={isOpen} onClose={closeMenu} />
        </nav>
    );
};

export default NavigationBar;