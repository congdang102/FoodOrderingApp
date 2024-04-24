import multer from 'multer';
import mongoose from 'mongoose';
import { connectToDatabase } from '@/utils/mongodb';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage }).single('image');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectToDatabase();

      upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).send({ error: "Error uploading image" });
        } else if (err) {
          return res.status(500).send({ error: "Internal Server Error" });
        }

        // Lưu đường dẫn ảnh vào MongoDB
        const imagePath = req.file.path;

        // Gửi đường dẫn ảnh về client
        res.status(200).send({ imagePath });
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
