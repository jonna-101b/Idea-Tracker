import express from "express";
import { connectDB } from "./config/mongoose.js";
import { config } from "./config/environments.js";
import router from "./config/route.js";

const app = express();

app.use(express.json());

app.use("/api", router);

const startServer = async () => {
    await connectDB();

    app.listen(config.port, () => {
        console.log(`Server running in ${config.env} mode on port ${config.port}`);
    });
};

startServer();