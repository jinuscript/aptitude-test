import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { serverClient } from "@/shared/api/serverClient";
import { getPurchaseHistoryQueryOptions } from "../model/purchaseHistoryQueryOptions";
import PurchaseHistoryList from "./PurchaseHistoryList";

const PurchaseHistory = async () => {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery(
        getPurchaseHistoryQueryOptions((url) => serverClient(`/order${url}`))
    );

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PurchaseHistoryList />
        </HydrationBoundary>
    );
};

export default PurchaseHistory;