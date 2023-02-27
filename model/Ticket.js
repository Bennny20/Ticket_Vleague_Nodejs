import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  TicketTyoe: {
    type: String,
    require: true,
  },
  Desc: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Ticket", TicketSchema);
