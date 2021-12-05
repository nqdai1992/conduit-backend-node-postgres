import fs from 'fs';
import path from 'path';
import db from './index'

export default async () => {
    const sql = fs.readFileSync(path.join(__dirname, 'init.sql')).toString();
    return await db.query(sql);
}
