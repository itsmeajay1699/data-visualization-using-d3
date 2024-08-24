import { Router } from "express";
import { getCustomerGrowthDayWise } from "../../controller/customer.controller.js";

const customerRouter = Router();

customerRouter.get("/", (req, res) => {
  res.send("Customer");
});

customerRouter.get("/new-customer", async (req, res) => {
  try {
    const customers = await getCustomerGrowthDayWise();
    res.status(200).json({
      success: true,
      length: customers.length,
      customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default customerRouter;
