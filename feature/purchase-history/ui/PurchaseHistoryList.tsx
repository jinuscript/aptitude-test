'use client';

import { useInfiniteQuery } from "@tanstack/react-query";
import { browserClient } from "@/shared/api/browserClient";
import { getPurchaseHistoryQueryOptions } from "../model/purchaseHistoryQueryOptions";

const PurchaseHistoryList = () => {
    const {
        data
    } = useInfiniteQuery(
        getPurchaseHistoryQueryOptions((url) => browserClient(`/proxy/purchase-history${url}`))
    );


    return (
        <ul></ul>
    );
}

export default PurchaseHistoryList;



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