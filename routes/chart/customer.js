import { Router } from "express";
import {
  getCustomerByCity,
  getCustomerGrowthDayWise,
  getRepeatCustomerDayWise,
  getRepeatCustomerMonthWise,
  getRepeatCustomerQuaterWise,
  getRepeatCustomerYearWise,
} from "../../controller/customer.controller.js";

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

customerRouter.get("/repeat-customer/day", async (req, res) => {
  try {
    const customers = await getRepeatCustomerDayWise();
    res.status(200).json({
      success: true,
      length: customers.length,
      customers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

customerRouter.get("/repeat-customer/month", async (req, res) => {
  try {
    const customers = await getRepeatCustomerMonthWise();
    res.status(200).json({
      success: true,
      length: customers.length,
      customers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

customerRouter.get("/repeat-customer/quater", async (req, res) => {
  try {
    const customers = await getRepeatCustomerQuaterWise();
    res.status(200).json({
      success: true,
      length: customers.length,
      customers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

customerRouter.get("/repeat-customer/year", async (req, res) => {
  try {
    const customers = await getRepeatCustomerYearWise();
    res.status(200).json({
      success: true,
      length: customers.length,
      customers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

customerRouter.get("/customer-city", async (req, res) => {
  try {
    const customerCity = await getCustomerByCity();
    res.status(200).json({
      success: true,
      length: customerCity.length,
      customerCity,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default customerRouter;
