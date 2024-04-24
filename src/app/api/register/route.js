import mongoose from "mongoose";
import { User } from "@/app/models/User";

export async function POST(req) {
    try {
        const body = await req.json();
        await mongoose.connect(process.env.MONGO_URL);
        const pass = body.password;
        if (!pass?.length || pass.length < 5) {
            throw new Error('password must be at least 5 characters');
        }

        const notHashedPassword = pass;
        const salt = bcrypt.genSaltSync(10);

        body.password = bcrypt.hashSync(notHashedPassword,salt);
        const createdUser = await User.create(body);
        return Response.json(createdUser);
    } catch (error) {
        console.error(error);
        return Response.error(500, "Internal Server Error");
    } finally {
        // Close database connection after operation
        await mongoose.disconnect();
    }
}
