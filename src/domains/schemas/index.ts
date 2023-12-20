import mongoose from "mongoose";
import { userSchema } from "./user-schema";
import { assistantSchema } from "./assistant-schema";

const user = mongoose.model('users', userSchema);
const assistant = mongoose.model('assistants', assistantSchema);

export const model = { user: user, assistant: assistant };