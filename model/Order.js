import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  totalPrice: {
    type: Number,
    require: true,
  },
  orderDeatails: {
    type: [String],
  },
});

export default mongoose.model("Order", OrderSchema);
