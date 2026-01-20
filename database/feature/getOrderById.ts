import 'server-only';

export const getOrderById = async (userOrderHistory: [], id: string) => {
    const order = userOrderHistory.find(order => order.id === id);

    return order;
};
