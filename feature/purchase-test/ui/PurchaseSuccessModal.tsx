import Modal from "@/shared/ui/Modal";

interface PurchaseSuccessModalProps {
    onConfirm: () => void;
}

const PurchaseSuccessModal = ({ onConfirm }: PurchaseSuccessModalProps) => {
    return (
        <Modal>
            <div className="flex flex-col gap-4 text-center">
                <h2 className="text-xl font-bold text-green-600">구매 성공</h2>
                <p>성공적으로 구매되었습니다. 대시보드로 이동합니다.</p>
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

export default PurchaseSuccessModal;