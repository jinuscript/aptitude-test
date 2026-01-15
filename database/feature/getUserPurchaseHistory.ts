import 'server-only';

import { readJsonDb } from '../shared/readJsonDb';

export const getUserPurchaseHistory = async (user_id: string) => {
    const userPurchaseHistory = await readJsonDb("database/purchaseHistory.json");

    return userPurchaseHistory[user_id] || [];
};
