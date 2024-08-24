import { giveCollection } from "../utils/index.js";

const getCustomerGrowthDayWise = async () => {
  try {
    const customer = await giveCollection("shopifyCustomers");

    const customerPipeLine = [
      {
        $project: {
          created_at: 1,
        },
      },

      {
        $group: {
          _id: {
            month: {
              $month: { $dateFromString: { dateString: "$created_at" } },
            },
            year: { $year: { $dateFromString: { dateString: "$created_at" } } },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ];

    const customers = await customer.aggregate(customerPipeLine).toArray();
    return customers;
  } catch (err) {
    return new Error(err);
  }
};

export { getCustomerGrowthDayWise };
