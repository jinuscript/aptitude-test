'use client';

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }: { children: ReactNode }) => {
    // hydration error 방지
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // 클라이언트에서만 실행
    if (!mounted) return null;

    // modal-root가 없으면 null 반환
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default Modal;