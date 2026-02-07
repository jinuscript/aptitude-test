import ProductCard from "./ProductCard";
import { getProduct } from "../api/getProduct";
import { type Product } from "../type/Product";
import PurchaseButton from "./PurchaseButton";

const ProductList = async () => {
    const { data } = await getProduct();

    return (
        <div>
            <h1>ProductList</h1>
            {
                data.map((product: Product) => (
                    <ProductCard key={product.id} product={product}>
                        <PurchaseButton product={product} />
                    </ProductCard>
                ))
            }
        </div>
    );
};

export default ProductList;