import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  order: {
    type: Array,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  user : {
    type :String,
    required: true,
  }
});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
