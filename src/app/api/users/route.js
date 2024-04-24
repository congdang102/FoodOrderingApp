import mongoose from "mongoose";
import { User } from "../../../models/User";

// export async function POST(req) {
//     await mongoose.connect(process.env.MONGO_URL);
//     const {name} = await req.json();
//     const userDoc =  await User.create({name});
//     return Response.json(categoryDoc);
// }
export async function GET() {
    await mongoose.connect(process.env.MONGO_URL);
    const users = await User.find();
    
    return Response.json(users);
}