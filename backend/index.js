//packages
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

//utils
import { connectDb } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
connectDb().then(() => {
  app.listen(port, () => console.log(`App Listening in Port: ${port}`));
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
