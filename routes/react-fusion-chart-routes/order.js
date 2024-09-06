import { Router } from "express";
import {
  getDataByTitle,
  OrderBySales,
  OrderBySalesAndTax,
} from "../../controller/order.controller.js";

const orderRouter = Router();

orderRouter.get("/", (req, res) => {
  return res.json("Hello world");
});

orderRouter.get("/sales/:type", async (req, res) => {
  try {
    const salesData = await OrderBySales(req.params.type);

    res.status(200).json({
      success: true,
      size: salesData.length,
      data: salesData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

orderRouter.get("/sale-tax", async (req, res) => {
  try {
    const saleTaxData = await OrderBySalesAndTax();
    res.status(200).json({
      success: true,
      // size: saleTaxData.length,
      data: saleTaxData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

orderRouter.get("/byTitle", async (req, res) => {
  try {
    const data = await getDataByTitle();
    res.status(200).json({
      success: true,
      length: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default orderRouter;
