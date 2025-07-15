import { promises as fs } from 'fs';
import path from 'path';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadsDir = path.join(process.cwd(), 'public', 'uploads');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  await fs.mkdir(uploadsDir, { recursive: true });
  const form = new IncomingForm({
    multiples: false,
    uploadDir: uploadsDir,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10MB
    filter: ({ mimetype }) => {
      return (
        mimetype && (
          mimetype.startsWith('image/') ||
          mimetype === 'application/pdf' ||
          mimetype === 'application/msword' ||
          mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
      );
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Upload error' });
      return;
    }
    const file = files.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    let uploadedFile = file;
    if (Array.isArray(file)) {
      uploadedFile = file[0];
    }
    const filePath = uploadedFile?.filepath || uploadedFile?.path;
    if (!filePath) {
      res.status(500).json({ error: 'File upload failed (no path)' });
      return;
    }
    const filename = path.basename(filePath);
    res.status(200).json({ filename });
  });
} 