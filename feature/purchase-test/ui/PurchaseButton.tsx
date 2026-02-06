'use client';

import { orderAction } from "../action/purchaseAction";
import { useRouter } from "next/navigation";

const PurchaseButton = () => {
    const router = useRouter();

    const handlePurchase = async () => {
        await orderAction();
        router.push('/dashboard');
    };

    return (
        <button onClick={handlePurchase}>상품 구매</button>
    );
};

export default PurchaseButton;