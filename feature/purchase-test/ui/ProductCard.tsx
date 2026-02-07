import { type ReactNode } from "react";
import { type Product } from "../type/Product";

const ProductCard = ({ product, children }: { product: Product, children: ReactNode }) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price.toLocaleString()}원</p>
            {children}
        </div>
    );
};

export default ProductCard;