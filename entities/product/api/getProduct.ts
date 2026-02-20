import { serverClient } from "@/shared/api/serverClient";

export const getProduct = async () => {
    return await serverClient("/product");
};