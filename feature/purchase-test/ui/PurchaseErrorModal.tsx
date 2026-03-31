import Modal from "@/shared/ui/Modal";

interface PurchaseErrorModalProps {
    onConfirm: () => void;
}

const PurchaseErrorModal = ({ onConfirm }: PurchaseErrorModalProps) => {
    return (
        <Modal>
            <div className="flex flex-col gap-4 text-center">
                <h2 className="text-xl font-bold text-red-600">구매 실패</h2>
                <p>구매에 실패했습니다. 다시 시도해주세요.</p>
                <button
                    onClick={onConfirm}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    확인
                </button>
            </div>
        </Modal>
    );
};

export default PurchaseErrorModal;