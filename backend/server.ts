import * as dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ItemRouter from "./routes/item";
import ItemMenuSectionRouter from "./routes/itemMenuSection";
import SellOrderRouter from "./routes/SellOrder";
import UserRouter from "./routes/user";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";

//Load variables from environment
dotenv.config();

//Parse requests in JSON & handle requests
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  next();
});
app.use(
  session({
    secret: `${process.env.SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Handle Cors
const allowedOrigins = [`http://localhost:${process.env.PORT}`, `http://localhost:${process.env.FRONTEND_PORT}`];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));

//Routers
app.use("/api/item", ItemRouter);
app.use("/api/itemMenuSection", ItemMenuSectionRouter);
app.use("/api/sellorder", SellOrderRouter);
app.use("/api/user", UserRouter);

//Establish connection to the DB & listen for requests
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    app.listen(Number(process.env.PORT), () => {
      console.log("Connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error: Error) => {
    console.log(error);
  });

export default app;
