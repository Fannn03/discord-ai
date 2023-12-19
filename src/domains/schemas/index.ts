import mongoose from "mongoose";
import { userSchema } from "./user-schema";

const user = mongoose.model('users', userSchema);

export const model = { user: user };