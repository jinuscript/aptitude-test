import PurchaseTestButton from "@/feature/purchase-test/ui/PurchaseTestButton";

import ProductCard from "@/entities/product/ui/ProductCard";
import { getProduct } from "@/entities/product/api/getProduct";
import { type Product } from "@/entities/product/type/Product";


const ProductCatalog = async () => {
    const { data } = await getProduct();

    return (
        <div>
            <h1>ProductList</h1>
            {
                data.map((product: Product) => (
                    <ProductCard key={product.id} product={product}>
                        <PurchaseTestButton product={product} />
                    </ProductCard>
                ))
            }
        </div>
    );
};

export default ProductCatalog;