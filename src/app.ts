import express, { Application, Request, Response } from "express";
import cors from "cors";
import { productRoute } from "./app/modules/Products/product.route";
import { orderRoute } from "./app/modules/Orders/order.route";
const app: Application = express();
// const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/", productRoute);
app.use("/", orderRoute);
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World! 2");
});

export default app;
