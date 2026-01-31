'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NavigationBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // 페이지 이동이 발생하면 모바일 메뉴를 닫음
    useEffect(() => {
        setIsOpen(false);
    }, [pathname])

    // 데스크톱 화면으로 이동하면 모바일 메뉴를 닫음
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsOpen(false);
            }
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <nav className="flex justify-between items-center max-w-[1140px] mx-auto px-4 md:px-6 lg:px-8 py-2">
            {/* 로고 */}
            <Link href="/" className="inline-block text-lg font-bold px-3 py-2">
                AI TEST
            </Link>

            {/* 데스크톱 메뉴 */}
            <ul className="hidden gap-4 lg:flex">
                <li><Link href="/login" className="inline-block text-lg font-medium px-3 py-2">로그인</Link></li>
            </ul>

            {/* 모바일 메뉴 */}
            <button
                className="lg:hidden"
                aria-label="메뉴 열기"
                onClick={() => setIsOpen(true)}
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
            {
                isOpen && (
                    <nav className="fixed top-0 left-0 w-full h-screen bg-white px-4 md:px-6 py-2">
                        <div className="flex justify-between items-center">
                            <Link href="/" className="inline-block text-lg font-bold px-3 py-2">
                                AI TEST
                            </Link>
                            <button
                                aria-label="메뉴 닫기"
                                onClick={() => setIsOpen(false)}
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
                        </div>
                        <ul className="flex flex-col">
                            <li><Link href="/login" className="block text-lg font-medium px-3 py-2">로그인</Link></li>
                        </ul>
                    </nav>
                )
            }
        </nav>
    );
};

export default NavigationBar;