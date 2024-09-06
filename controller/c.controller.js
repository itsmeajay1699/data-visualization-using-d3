import { giveCollection } from "../utils/index.js";

export const getCustomerByCityAndProvince = async () => {
  try {
    const customerCollection = await giveCollection("shopifyCustomers");

    const pipeline = [
      {
        $group: {
          _id: {
            city: "$default_address.city",
            province: "$default_address.province",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.province",
          city: {
            $push: {
              city: "$_id.city",
              count: "$count",
            },
          },
          total_count: { $sum: "$count" },
        },
      },
      {
        $project: {
          label: "$_id",
          _id: 0,
          city: 1,
          total_count: 1,
        },
      },
      {
        $sort: {
          label: 1,
        },
      },
    ];

    const data = customerCollection.aggregate(pipeline).toArray();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getUpdateAccountDetails = async () => {
  try {
    const customerCollection = await giveCollection("shopifyCustomers");

    const pipeline = [
      {
        $group: {
          _id: {
            month: {
              $month: "$updated_at",
            },
            year: { $year: "$updated_at" },
          },
          value: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.month": 1,
          "_id.year": 1,
        },
      },
      {
        $project: {
          _id: 0,
          value: 1,
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

    const data = await customerCollection.aggregate(pipeline).toArray();
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
