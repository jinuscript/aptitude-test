import { orderAction } from "../action/purchaseAction";
import { useRouter } from "next/navigation";

export const useOrder = () => {
    const router = useRouter();

    const handleOrder = async (code: string) => {
        await orderAction(code);
        router.push('/dashboard');
    };

    return {
        handleOrder
    };
}