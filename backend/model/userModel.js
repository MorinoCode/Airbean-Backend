import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email är obligatoriskt"],
    unique: [true, "Email addressen är redan registerad"],
    match: [
      /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/,
      "Email addres är inte giltigt",
    ],
  },
  password: {
    type: String,
    required: true,
    minLength: [5, "Lösenord är för kort"],
    maxLenght: 150,
    match: [/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, "Lösenord är inte giltigt"],
  },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
