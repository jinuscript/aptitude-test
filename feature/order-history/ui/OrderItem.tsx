import Link from "next/link";

import { type OrderItem } from "@/shared/types/OrderItem";
import { getOrderTargetUrl } from "@/feature/order-history/utils/getOrderTargetUrl";

const OrderItem = ({ order }: { order: OrderItem }) => {
    const targetUrl = getOrderTargetUrl(order);

    return (
        <div>
            <p>{order.name}</p>
            <p>{order.purchase_date}</p>
            <p>{order.status}</p>
            <Link href={targetUrl}>가기</Link>
        </div>
    )
}

export default OrderItem