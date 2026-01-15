import 'server-only';

import fs from 'fs/promises';
import path from 'path';

export const readJsonDb = async (filePath: string) => {
    const DB_PATH = path.join(process.cwd(), filePath);
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
};