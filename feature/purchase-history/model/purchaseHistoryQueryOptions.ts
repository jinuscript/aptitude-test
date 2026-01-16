import { infiniteQueryOptions } from "@tanstack/react-query";

export const getPurchaseHistoryQueryOptions = (
    fetcher: (url: string) => Promise<Response>
) => {
    return infiniteQueryOptions({
        queryKey: ['order'],
        queryFn: async ({ pageParam = 1 }) => {
            const res = await fetcher(`?page=${pageParam}`);
            if (!res.ok) {
                throw new Error('Failed to fetch purchase history');
            }
            return res.json();
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });
};
