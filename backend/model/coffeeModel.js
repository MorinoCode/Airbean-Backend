import mongoose, { Schema } from "mongoose";

const coffeeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const coffeeModel = mongoose.model("coffee", coffeeSchema);
export default coffeeModel;
