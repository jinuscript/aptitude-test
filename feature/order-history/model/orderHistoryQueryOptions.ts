import { infiniteQueryOptions } from "@tanstack/react-query";

export const getOrderHistoryQueryOptions = (
    fetcher: (url: string) => Promise<Response>
) => {
    return infiniteQueryOptions({
        queryKey: ['order-history'],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await fetcher(`?page=${pageParam}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
        retry: 1,
    });
};
