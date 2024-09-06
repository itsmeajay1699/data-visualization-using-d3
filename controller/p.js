import { giveCollection } from "../utils/index.js";

export const getByVendor = async () => {
  const product = await giveCollection("shopifyProducts");

  const products = await product
    .aggregate([
      {
        $project: {
          year: {
            $year: { $dateFromString: { dateString: "$created_at" } },
          },
          _id: 0,
          month: {
            $month: { $dateFromString: { dateString: "$created_at" } },
          },
          day: {
            $dayOfMonth: { $dateFromString: { dateString: "$created_at" } },
          },

          product_type: 1,
        },
      },

      {
        $addFields: {
          sum: { $add: ["$year", "$day"] },
          qValue: {
            $ceil: { $divide: ["$month", 3] },
          },
        },
      },

      {
        $group: {
          _id: "$qValue",
          count: { $sum: 1 },
          // sumArray:{$push:"$sum"}
        },
      },

      {
        $sort: {
          _id: 1, // 1 chote se bda or -1 hotha hai bade se chota
        },
      },
    ])
    .toArray();

  return products;
};

// data k case old date is small
// new date is greater
