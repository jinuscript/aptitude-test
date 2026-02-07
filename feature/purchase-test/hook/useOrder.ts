import { orderAction } from "../action/purchaseAction";
import { useRouter } from "next/navigation";

export const useOrder = () => {
    const router = useRouter();

    const handleOrder = async (code: string, totalSection: number) => {
        await orderAction(code, totalSection);
        router.push('/dashboard');
    };

    return {
        handleOrder
    };
}