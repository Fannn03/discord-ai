import mongoose from "mongoose";

export const connectMongodb = async () => {
  try {
    await mongoose.connect(process.env.DB_HOST as string);
    console.log('connected to mongodb atlas');
  } catch (err) {
    throw err;
  }
}