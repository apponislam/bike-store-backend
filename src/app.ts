import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/Products/product.route";
import { orderRoute } from "./app/modules/Orders/order.route";
import { userRoute } from "./app/modules/Users/user.route";
import globalErrorHandler from "./app/errors/globalErrorHandler";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/", productRoute);
app.use("/", orderRoute);
app.use("/", userRoute);
app.get("/", (req: Request, res: Response) => {
    res.send("Bike Store is available");
});

app.use(globalErrorHandler);

export default app;
