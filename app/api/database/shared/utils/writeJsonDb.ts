import 'server-only';

import fs from 'fs/promises';
import path from 'path';

export const writeJsonDb = async (filePath: string, data: any) => {
    const DB_PATH = path.join(process.cwd(), filePath);
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
};