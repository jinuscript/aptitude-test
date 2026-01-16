'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { browserClient } from "@/shared/api/browserClient";
import { getOrderHistoryQueryOptions } from "../model/orderHistoryQueryOptions";
import { type OrderItem } from "@/shared/types/OrderItem";

const OrderList = () => {
    const {
        data
    } = useInfiniteQuery(
        getOrderHistoryQueryOptions((url) => browserClient(`/order${url}`))
    );

    return (
        <ul>
            {
                data?.pages[0]?.userOrderHistory?.map((order: OrderItem) => (
                    <li key={order.id}>{order.name}</li>
                ))
            }
        </ul>
    );
}

export default OrderList;



// const allItems = data.pages.flatMap(page => page.items); 
// // 2. Just render the list
// allItems.map(item => <Item />)

// {
//     data?.pages?.map((page, index) => (
//         page?.paginatedPurchase?.map((purchase, index) => (
//             <li key={index}>{purchase?.name}</li>
//         ))
//     ))
// }