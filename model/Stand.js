import mongoose from "mongoose";

const StandSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  quantitySeat: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  stadiumId: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Stand", StandSchema);
