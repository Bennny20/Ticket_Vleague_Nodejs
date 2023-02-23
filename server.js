import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/usersRoute.js";
import tournamentRoute from "./routes/tournamentRoute.js";
import roundRoute from "./routes/roundRoute.js";
import stadiumRoute from "./routes/stadiumRoute.js";
import clubRoute from "./routes/clubRoute.js";
import matchRoute from "./routes/matchRoute.js";

const URL = `mongodb+srv://PhienTQ:Phiengk20@cluster0.aa1zf9y.mongodb.net/?retryWrites=true&w=majority`;

const app = express();
dotenv.config();

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(URL);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/tournaments", tournamentRoute);
app.use("/api/rounds", roundRoute);
app.use("/api/stadium", stadiumRoute);
app.use("/api/clubs", clubRoute);
app.use("/api/matchs", matchRoute);



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMess = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMess,
    stack: err.stack,
  });
});

app.listen(8800, () => {
  connect();
  console.log("🚀 Server ready at http://localhost:8800");
});
