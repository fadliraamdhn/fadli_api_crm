import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import authRoute from "~/routes";
import { logger } from "~/middlewares/logger";
import { errorMiddleware } from "~/middlewares/error.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.use(logger);

app.use("/crm-api", authRoute);

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
