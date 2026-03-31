import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { serverClient } from "@/shared/api/serverClient";
import { getOrderHistoryQueryOptions } from "../model/orderHistoryQueryOptions";
import OrderList from "./OrderList";

const OrderHistory = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery(
        getOrderHistoryQueryOptions((url) => serverClient(`/order${url}`))
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <OrderList />
        </HydrationBoundary>
    );
};

export default OrderHistory;