import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { filename } = req.query;
  const filePath = path.join(process.cwd(), 'uploads', filename);

  try {
    const file = await fs.readFile(filePath);
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    if (ext === '.png') contentType = 'image/png';
    if (ext === '.gif') contentType = 'image/gif';
    res.setHeader('Content-Type', contentType);
    res.send(file);
  } catch (err) {
    res.status(404).send('Not found');
  }
} 