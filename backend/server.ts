import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ItemsRouter from "./routes/Items";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
});

const allowedOrigins = [`http://localhost:${process.env.PORT}`, `http://localhost:${process.env.FRONTEND_PORT}`];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

app.use("/api/items", ItemsRouter);

app.listen(Number(process.env.PORT), () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

export default app;
