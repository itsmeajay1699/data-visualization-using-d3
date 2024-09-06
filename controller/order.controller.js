import { giveCollection } from "../utils/index.js";

const monthPipeline = () => {
  return [
    {
      $group: {
        _id: {
          month: { $month: "$created_at" },
          year: { $year: "$created_at" },
        },
        total: { $sum: { $toDouble: "$total_price" } },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
    {
      $project: {
        _id: 0,
        value: "$total",
        label: {
          $concat: [
            { $toString: "$_id.month" },
            "/",
            { $toString: "$_id.year" },
          ],
        },
      },
    },
  ];
};

const getOrderSalePipeline = (type) => {
  switch (type) {
    case "month":
      return [...monthPipeline()];
    default:
      return [...monthPipeline()];
  }
};

export const OrderBySales = async (type) => {
  try {
    const orderCollection = await giveCollection("shopifyOrders");
    const pipeline = getOrderSalePipeline(type);

    const salesData = await orderCollection.aggregate(pipeline).toArray();

    return salesData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const OrderBySalesAndTax = async () => {
  try {
    const pipeline = [
      {
        $group: {
          _id: {
            month: {
              $month: "$created_at",
            },
            year: { $year: "$created_at" },
          },
          saleTotal: { $sum: { $toDouble: "$total_price" } },
          taxTotal: { $sum: { $toDouble: "$total_tax" } },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          saleValue: "$saleTotal",
          taxValue: "$taxTotal",
          label: {
            $concat: [
              { $toString: "$_id.month" },
              "/",
              { $toString: "$_id.year" },
            ],
          },
        },
      },
    ];
    const order = await giveCollection("shopifyOrders");
    const saleTaxData = await order.aggregate(pipeline).toArray();
    return saleTaxData;
  } catch (err) {
    throw new Error(err.message);
  }
};

export const getDataByTitle = async () => {
  try {
    const orderCollection = await giveCollection("shopifyOrders");
    const pipeline = [
      {
        $unwind: {
          path: "$line_items",
        },
      },
      {
        $group: {
          _id: "$line_items.title",
          value: { $sum: 1 },
        },
      },
      {
        $project: {
          label: "$_id",
          value: 1,
          _id: 0,
        },
      },
      {
        $sort: {
          label: 1,
        },
      },
    ];
    const dataByTitle = await orderCollection.aggregate(pipeline).toArray();
    return dataByTitle;
  } catch (err) {
    throw new Error(err);
  }
};
