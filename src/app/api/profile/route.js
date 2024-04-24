import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { User } from "@/models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UserInfo } from "../../../models/UserInfo";

import cloudinary from 'cloudinary';
// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});
// Import necessary modules and configurations

export async function PUT(req) {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const data = await req.json();
        const { _id, name, image, ...otherUserInfo } = data;

        let filter = {};
        if (_id) {
            filter = { _id };

            if (image) {
                const cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: 'profile_images' });
                otherUserInfo.image = cloudinaryResponse.secure_url;
            }

            // Cập nhật thông tin mới chỉ cho người dùng cụ thể
           // Trong PUT
            const user = await User.findOne(filter);
            await User.updateOne(filter, { name });
            await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });


            return Response.json(true);
        } else {
            // Xử lý khi không có _id (thêm trường hợp này để đảm bảo cập nhật thông tin của người dùng cụ thể)
            const session = await getServerSession(authOptions);
            const email = session.user.email;
            filter = { email };

            const user = await User.findOne(filter);
            await User.updateOne(filter, { name, image: otherUserInfo.image });
            await UserInfo.findOneAndUpdate({ email: user.email }, otherUserInfo, { upsert: true });

            return Response.json(true);
        }
    } catch (error) {
        console.error("Error:", error);
        return Response.error(500, "Internal Server Error");
    }
}



export async function GET(req) {
    mongoose.connect(process.env.MONGO_URL);

    const url = new URL(req.url);
    const _id = url.searchParams.get('_id');
    let filter = {};
    if (_id) {
        filter = { _id };
    } else {
        const session = await getServerSession(authOptions);
        const email = session?.user?.email;
        if (!email) {
            return Response.json({});
        }
        filter = { email };
    }

    const user = await User.findOne(filter).lean();
    const userInfo = await UserInfo.findOne({ email: user.email }).lean();
    return Response.json({ ...user, ...userInfo });
}
