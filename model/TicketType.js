import mongoose from "mongoose";

const TikcetTypeSchema = new mongoose.Schema({
  matchID: {
    type: String,
    require: true,
  },
  stand: {
    type: String,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Stand", StandSchema);
