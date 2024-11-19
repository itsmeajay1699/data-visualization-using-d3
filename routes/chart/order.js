import { Router } from "express";
import { giveCollection } from "../../utils/index.js";
const productRouter = Router();

// fetch all products from the database based on the day 1-31 of the month

productRouter.get("/day", async (req, res) => {
  try {
    const shopifyOrders = await giveCollection("shopifyOrders");
    console.log(shopifyOrders);
    const pipeline = [
      {
        $project: {
          created_at: 1,
          total_price_set: 1,
        },
      },
      {
        $group: {
          _id: {
            $dayOfMonth: { $dateFromString: { dateString: "$created_at" } },
          },
          totalSales: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
          // orders: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    const products = await shopifyOrders.aggregate(pipeline).toArray();

    return res.json({
      success: true,
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

productRouter.get("/month", async (req, res) => {
  try {
    const shopifyOrders = await giveCollection("shopifyOrders");
    const pipeline = [
      {
        $project: {
          created_at: 1,
          total_price_set: 1,
          month: { $month: { $dateFromString: { dateString: "$created_at" } } },
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
        },
      },
      {
        $group: {
          _id: {
            month: "$month",
            year: "$year",
          },
          totalSales: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
          // orders: { $push: "$$ROOT" },
        },
      },
      {
        $sort: {
          "_id.month": 1,
          "_id.year": 1,
        },
      },
    ];
    const products = await shopifyOrders.aggregate(pipeline).toArray();

    return res.json({
      success: true,
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

productRouter.get("/year", async (req, res) => {
  try {
    const shopifyOrders = await giveCollection("shopifyOrders");
    const pipeline = [
      {
        $project: {
          created_at: 1,
          total_price_set: 1,
        },
      },
      {
        $group: {
          _id: {
            $year: { $dateFromString: { dateString: "$created_at" } },
          },
          totalSales: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
          // orders: { $push: "$$ROOT" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ];
    const products = await shopifyOrders.aggregate(pipeline).toArray();

    return res.json({
      success: true,
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

productRouter.get("/quater", async (req, res) => {
  try {
    const shopifyOrders = await giveCollection("shopifyOrders");
    const pipeline = [
      {
        $project: {
          created_at: 1,
          total_price_set: 1,
          month: { $month: { $dateFromString: { dateString: "$created_at" } } },
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
          quater: {
            $ceil: {
              $divide: [
                { $month: { $dateFromString: { dateString: "$created_at" } } },
                3,
              ],
            },
          },
        },
      },
      // {
      //   $addFields: {
      //     quarter: {
      //       $switch: {
      //         branches: [
      //           {
      //             case: {
      //               $lte: [
      //                 {
      //                   $month: {
      //                     $dateFromString: { dateString: "$created_at" },
      //                   },
      //                 },
      //                 3,
      //               ],
      //             },
      //             then: 1,
      //           },
      //           {
      //             case: {
      //               $lte: [
      //                 {
      //                   $month: {
      //                     $dateFromString: { dateString: "$created_at" },
      //                   },
      //                 },
      //                 6,
      //               ],
      //             },
      //             then: 2,
      //           },
      //           {
      //             case: {
      //               $lte: [
      //                 {
      //                   $month: {
      //                     $dateFromString: { dateString: "$created_at" },
      //                   },
      //                 },
      //                 9,
      //               ],
      //             },
      //             then: 3,
      //           },
      //           {
      //             case: {
      //               $lte: [
      //                 {
      //                   $month: {
      //                     $dateFromString: { dateString: "$created_at" },
      //                   },
      //                 },
      //                 12,
      //               ],
      //             },
      //             then: 4,
      //           },
      //         ],
      //         default: "Unknown",
      //       },
      //     },
      //   },
      // },
      {
        $group: {
          _id: {
            year: "$year",
            quater: "$quater",
          },
          totalSales: {
            $sum: { $toDouble: "$total_price_set.shop_money.amount" },
          },
          // orders: { $push: "$$ROOT" },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ];
    const products = await shopifyOrders.aggregate(pipeline).toArray();

    return res.json({
      success: true,
      length: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default productRouter;
