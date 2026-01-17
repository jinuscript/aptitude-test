import { type OrderItem } from "@/shared/types/OrderItem";

export const getOrderTargetUrl = (order: OrderItem) => {
    const { id, status, current_step } = order;

    if (status === "COMPLETED") {
        return `/result/${id}`;
    }

    if (status === "IN_PROGRESS") {
        return `/test/${id}/${current_step.toLowerCase()}`;
    }

    // Default for PENDING or any other state
    return `/test/${id}/capability`;
};
