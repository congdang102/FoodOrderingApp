import mongoose from "mongoose";

// Định nghĩa schema cho dữ liệu ảnh
const imageSchema = new mongoose.Schema({
    data: {
        type: Buffer, // Dữ liệu ảnh sẽ được lưu trữ dưới dạng buffer
        required: true
    },
    contentType: {
        type: String, // Kiểu dữ liệu của ảnh (ví dụ: image/png, image/jpeg)
        required: true
    }
});

// Tạo model từ schema
const ImageModel = mongoose.model('Image', imageSchema);

export async function POST(req, res) {
    if (req.method === 'POST') {
        try {
            // Kiểm tra xem req.body có dữ liệu không
            if (!req.body || !req.body.imageBase64) {
                return res.status(400).send({ error: "Image data is missing" });
            }

            // Kết nối với cơ sở dữ liệu MongoDB
            await mongoose.connect(process.env.MONGO_URL);

            // Lấy dữ liệu ảnh từ request
            const { imageBase64 } = req.body;

            // Tạo một instance mới của ImageModel để lưu trữ dữ liệu ảnh
            const newImage = new ImageModel({
                data: Buffer.from(imageBase64, 'base64'), // Chuyển đổi base64 thành buffer
                contentType: 'image/png' // Đây là kiểu dữ liệu mặc định, bạn có thể thay đổi tùy thuộc vào loại ảnh
            });

            // Lưu dữ liệu ảnh vào MongoDB
            await newImage.save();

            // Trả về thông báo thành công
            res.status(200).send({ message: "Image saved successfully" });
        } catch (error) {
            console.error("Error:", error);
            res.status(500).send({ error: "Internal Server Error" });
        }
    } else {
        res.status(405).end(); // Method Not Allowed
    }
}
