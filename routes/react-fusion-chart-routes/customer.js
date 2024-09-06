import { Router } from "express";
import {
  getCustomerByCityAndProvince,
  getUpdateAccountDetails,
} from "../../controller/c.controller.js";

const customerRouter = Router();

customerRouter.get("/", async (req, res) => {
  res.json({ message: "helllo" });
});

customerRouter.get("/city-province", async (req, res) => {
  try {
    const data = await getCustomerByCityAndProvince();
    res.status(200).json({
      success: true,
      size: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

customerRouter.get("/acount-update", async (req, res) => {
  try {
    const data = await getUpdateAccountDetails();
    res.status(200).json({
      success: true,
      size: data.length,
      data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default customerRouter;
