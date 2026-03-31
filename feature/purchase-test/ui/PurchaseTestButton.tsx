'use client';

import { type Product } from "@/entities/product/type/Product";
import { usePurchaseTest } from "../hook/usePurchaseTest";

const PurchaseTestButton = ({ product }: { product: Product }) => {
    const { handlePurchaseTest } = usePurchaseTest();

    return (
        <button onClick={() => handlePurchaseTest(product.code)}>상품 구매</button>
    );
};

export default PurchaseTestButton;