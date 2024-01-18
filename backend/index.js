import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";

const app = express();
// middleware for parsing req.body (json read)
app.use(express.json());

app.use(
  cors({
    origin: ["https://travel-app-one-iota.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"],
    credentials: true,
  })
);

//Routes
app.use("/user", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use("/uploads", express.static("public/uploads"));

// Logging the rejected field from multer error
app.use((error, req, res, next) => {
  console.log("This is the rejected field ->", error.field);
});

//Connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () =>
      console.log(`App started at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error(err);
  });
