import { Schema } from "mongoose";

export const assistantSchema = new Schema({
  assistant_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  }
}, { timestamps: true });