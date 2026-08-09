import express from "express";
import cors from "cors";
import { connectDB } from "./config/mongoose.js";
import { config } from "./config/environments.js";
import router from "./config/route.js";
import { globalErrorHandler } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Your React/Vite dev server URL
    credentials: true,               // Crucial for HttpOnly cookies / headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);app.use(cookieParser())

app.use("/api", router);

router.use(globalErrorHandler);

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
};

startServer();