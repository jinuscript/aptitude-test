'use client';

import Link from "next/link";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    if (!isOpen) return null;

    return (
        <nav className="fixed top-0 left-0 w-full h-screen bg-white px-4 md:px-6 py-2 z-60">
            <div className="flex justify-between items-center">
                <Link href="/" className="inline-block text-lg font-bold px-3 py-2">
                    AI TEST
                </Link>
                <button
                    aria-label="메뉴 닫기"
                    onClick={onClose}
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
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <ul className="flex flex-col mt-4">
                <li>
                    <Link
                        href="/login"
                        className="block text-lg font-medium px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                        로그인
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default MobileMenu;
