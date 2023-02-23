import mongoose from "mongoose";


const matchSchema = new mongoose.Schema({
  homeClub: {
    type: String,
    default: false,
  },
  awayClub: {
    type: String,
    default: false,
  },
  stadium: {
    type: String,
    default: null,
  },
  roundId: {
    type: String,
    default: null,
  },
  date: {
    type: Date,
    require: true,
  },
  status: {
    type: Number,
    default: false,
  },
});

export default mongoose.model("Match", matchSchema);
