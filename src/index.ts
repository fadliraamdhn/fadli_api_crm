import express from "express";
import dotenv from "dotenv";
import authRoute from "~/routes";
import { logger } from "~/middlewares/logger";
import { errorMiddleware } from "~/middlewares/error.middleware";
import cors from "cors"

dotenv.config();

const app = express();
const port = process.env.PORT;
const allowedCors = process.env.CORS_ORIGIN

app.use(cors({
    origin: allowedCors
}))

app.use(express.json());

app.use(logger);

app.use("/crm-api", authRoute);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
