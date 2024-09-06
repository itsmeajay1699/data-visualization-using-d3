import { Router } from "express";
import productRouter from "./chart/order.js";
import customerRouter from "./chart/customer.js";
import orderRouter from "./react-fusion-chart-routes/order.js";
import customerRouterTwo from "./react-fusion-chart-routes/customer.js";
const indexRouter = Router();

indexRouter.use("/products", productRouter);
indexRouter.use("/customers", customerRouter);

// For React Fusion Charts

indexRouter.use("/fusion-charts/order", orderRouter);
indexRouter.use("/fusion-charts/customer", customerRouterTwo);

export default indexRouter;
