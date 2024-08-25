import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Database connected");
    } catch (error) {
        console.log("something went wrong!", error);
    }
}

export default connect;