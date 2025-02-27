import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/Products/product.route";
import { userRoute } from "./app/modules/Users/user.route";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import notFound from "./app/errors/notFount";
import orderRouter from "./app/modules/Orders/order.route";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173", "https://peppy-hotteok-65ea2d.netlify.app/"], credentials: true }));

app.use("/", productRoute);

app.use("/", orderRouter);
app.use("/", userRoute);
app.get("/", (req: Request, res: Response) => {
    res.send("Bike Store is available");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
