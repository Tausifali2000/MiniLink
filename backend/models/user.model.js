import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  number: {
    type: Number,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }
})

export const User = mongoose.model("User", userSchema);