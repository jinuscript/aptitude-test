import { type OrderItem } from "@/shared/types/OrderItem";

const OrderItem = ({ order }: { order: OrderItem }) => {
    return (
        <div>
            <p>{order.name}</p>
            <p>{order.purchase_date}</p>
            <p>{order.status}</p>
        </div>
    )
}

export default OrderItem