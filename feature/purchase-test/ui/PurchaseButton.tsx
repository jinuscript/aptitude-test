'use client';

import { useOrder } from "../hook/useOrder";
import { type Product } from "../type/Product";

const PurchaseButton = ({ product }: { product: Product }) => {
    const { handleOrder } = useOrder();

    return (
        <button onClick={() => handleOrder(product.code, product.totalSection)}>상품 구매</button>
    );
};

export default PurchaseButton;