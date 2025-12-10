import express from "express";
import cors from "cors";
const app = express();

// database connection
import connectDB from "./database/connect.js";

// document Router
import DocumentRouter from "./routes/document-upload.js";

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/api/v1/documents", DocumentRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`This server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

start();
