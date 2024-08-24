import { Router } from "express";
import productRouter from "./chart/order.js";
import customerRouter from "./chart/customer.js";
const indexRouter = Router();

indexRouter.use("/products", productRouter);
indexRouter.use("/customers", customerRouter);

export default indexRouter;
