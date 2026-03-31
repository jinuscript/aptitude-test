import { useRouter } from "next/navigation";

import { purchaseTestAction } from "../action/purchaseTestAction";
import { type Code } from "@/shared/types/Code";

import { useModalStore } from "@/shared/store/useModalStore";

import PurchaseErrorModal from "../ui/PurchaseErrorModal";
import PurchaseSuccessModal from "../ui/PurchaseSuccessModal";

export const usePurchaseTest = () => {
    const { push } = useRouter();
    const { openModal, closeModal } = useModalStore();

    const handlePurchaseTest = async (code: Code) => {
        const result = await purchaseTestAction(code);

        if (!result.success) {
            openModal(<PurchaseErrorModal onConfirm={closeModal} />);
            return;
        }

        openModal(<PurchaseSuccessModal onConfirm={() => {
            closeModal();
            push('/dashboard');
        }} />);

    };

    return {
        handlePurchaseTest
    };
}