import ProductCard from "./ProductCard";
import { getProduct } from "../api/getProduct";

const ProductList = async () => {
    const products = await getProduct();

    console.log(products);

    return (
        <div>
            <h1>ProductList</h1>
            <ProductCard />
        </div>
    );
};

export default ProductList;