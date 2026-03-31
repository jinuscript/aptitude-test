'use client';

import { useModalStore } from "@/shared/store/useModalStore";

const GlobalModal = () => {
    const { isOpen, content } = useModalStore();

    if (!isOpen) return null;

    return (
        <>{content}</>
    );
};

export default GlobalModal;
