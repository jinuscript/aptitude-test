export interface OrderItem {
    "id": number;
    "product_id": string;
    "name": "초등용 앱티핏" | "중학교용 앱티핏" | "고등학교용 앱티핏";
    "purchase_date": string;
    "test_finish_date": string;
    "status": "PENDING" | "IN_PROGRESS" | "COMPLETED";
    "current_step": "CAPABILITY" | "TEST" | "FINISH";
}

