import { useRouter } from "next/navigation";

import { purchaseTestAction } from "../action/purchaseTestAction";
import { type Code } from "@/shared/types/Code";

export const usePurchaseTest = () => {
    const { push } = useRouter();

    const handlePurchaseTest = async (code: Code) => {
        await purchaseTestAction(code);
        push('/dashboard');
    };

    return {
        handlePurchaseTest
    };
}