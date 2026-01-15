import 'server-only';

import { readJsonDb } from '../shared/readJsonDb';
import { type User } from '@/shared/types/User';

export const findUserById = async (user_id: string) => {
    const users = await readJsonDb('database/users.json');

    return users.find((user: User) => user.user_id === user_id);
};
