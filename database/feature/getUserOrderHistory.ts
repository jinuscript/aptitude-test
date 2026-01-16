import 'server-only';

import { readJsonDb } from '../shared/readJsonDb';

export const getUserOrderHistory = async (user_id: string) => {
    const allOrderHistory = await readJsonDb("database/orderHistory.json");

    return allOrderHistory[user_id] || [];
};
