import { Schema } from "mongoose";

export const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  assistant: {
    type: Schema.Types.Mixed,
    default: null
  }
}, { timestamps: true } );