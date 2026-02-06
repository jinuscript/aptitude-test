import { type Product } from "../type/Product";
import PurchaseButton from "./PurchaseButton";

const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
            <PurchaseButton />
        </div>
    );
};

export default ProductCard;