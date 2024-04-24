// Import các dependencies cần thiết
import { Router } from 'express';
import multer from 'multer'; // Nếu bạn sử dụng multer để xử lý tệp tải lên

// Khởi tạo router
const router = Router();

// Khởi tạo một middleware multer để xử lý tệp tải lên
const upload = multer({ dest: 'uploads/' });

// Xử lý route POST để tải lên ảnh
router.post('/', upload.single('file'), (req, res) => {
    // Xử lý logic để lưu trữ ảnh và trả về đường dẫn của ảnh
    const imagePath = req.file.path;
    // Trả về đường dẫn của ảnh hoặc bất kỳ thông tin khác bạn muốn
    res.status(200).json({ imageUrl: imagePath });
});

// Xuất router để có thể sử dụng ở các file khác
export default router;
