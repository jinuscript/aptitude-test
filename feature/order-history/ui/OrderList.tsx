'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { browserClient } from "@/shared/api/browserClient";
import { getOrderHistoryQueryOptions } from "../model/orderHistoryQueryOptions";
// import { type OrderItem } from "@/shared/types/OrderItem";
import OrderItem from "./OrderItem";

const OrderList = () => {
    const {
        data
    } = useInfiniteQuery(
        getOrderHistoryQueryOptions((url) => browserClient(`/order${url}`))
    );

    const allOrders = data?.pages?.flatMap((page) => page.userOrderHistory);

    return (
        <ul>
            {
                allOrders?.map((order) => (
                    <li key={order.id}><OrderItem order={order} /></li>
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