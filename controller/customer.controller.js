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

const getRepeatCustomerDayWise = async () => {
  try {
    const order = await giveCollection("shopifyOrders");

    // const orderPipeline = [
    //   {
    //     $project: {
    //       email: 1,
    //       created_at: 1,
    //     },
    //   },
    //   {
    //     $lookup: {
    //       from: "shopifyCustomers",
    //       localField: "email",
    //       foreignField: "email",
    //       as: "customer",
    //     },
    //   },
    //   {
    //     $unwind: "$customer",
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         email: "$customer.email",
    //         day: {
    //           $dayOfMonth: { $dateFromString: { dateString: "$created_at" } },
    //         },
    //       },
    //       count: { $sum: 1 },
    //     },
    //   },
    //   {
    //     $match: {
    //       count: { $gt: 1 },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       day: "$_id.day",
    //       count: 1,
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: "$day",
    //       count: { $sum: "$count" },
    //     },
    //   },
    //   {
    //     $sort: {
    //       _id: 1,
    //     },
    //   },
    // ];

    const dailyRepeatCustomersPipeline = [
      {
        $project: {
          email: 1,
          day: {
            $dayOfMonth: { $dateFromString: { dateString: "$created_at" } },
          },
          month: { $month: { $dateFromString: { dateString: "$created_at" } } },
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
        },
      },
      {
        $group: {
          _id: { day: "$day", month: "$month", year: "$year", email: "$email" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 },
        },
      },
      {
        $group: {
          _id: { day: "$_id.day", month: "$_id.month", year: "$_id.year" },
          repeatCustomers: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
          "_id.day": 1,
        },
      },
    ];

    const repeatCustomer = await order
      .aggregate(dailyRepeatCustomersPipeline)
      .toArray();

    return repeatCustomer;
  } catch (err) {
    return new Error(err);
  }
};

const getRepeatCustomerMonthWise = async () => {
  try {
    const order = await giveCollection("shopifyOrders");

    const monthlyRepeatCustomersPipeline = [
      {
        $project: {
          email: 1,
          month: { $month: { $dateFromString: { dateString: "$created_at" } } },
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year", email: "$email" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 },
        },
      },
      {
        $group: {
          _id: { month: "$_id.month", year: "$_id.year" },
          repeatCustomers: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ];

    const repeatCustomer = await order
      .aggregate(monthlyRepeatCustomersPipeline)
      .toArray();

    return repeatCustomer;
  } catch (err) {
    return new Error(err);
  }
};

const getRepeatCustomerQuaterWise = async () => {
  try {
    const order = await giveCollection("shopifyOrders");

    const quarterlyRepeatCustomersPipeline = [
      {
        $project: {
          email: 1,
          month: { $month: { $dateFromString: { dateString: "$created_at" } } },
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
          quarter: {
            $ceil: {
              $divide: [
                { $month: { $dateFromString: { dateString: "$created_at" } } },
                3,
              ],
            },
          },
        },
      },
      {
        $group: {
          _id: { quarter: "$quarter", year: "$year", email: "$email" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 },
        },
      },
      {
        $group: {
          _id: { quarter: "$_id.quarter", year: "$_id.year" },
          repeatCustomers: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.quarter": 1,
        },
      },
    ];

    const repeatCustomer = await order
      .aggregate(quarterlyRepeatCustomersPipeline)
      .toArray();

    return repeatCustomer;
  } catch (err) {
    return new Error(err);
  }
};

const getRepeatCustomerYearWise = async () => {
  try {
    const order = await giveCollection("shopifyOrders");

    const yearlyRepeatCustomersPipeline = [
      {
        $project: {
          email: 1,
          year: { $year: { $dateFromString: { dateString: "$created_at" } } },
        },
      },
      {
        $group: {
          _id: { year: "$year", email: "$email" },
          orderCount: { $sum: 1 },
        },
      },
      {
        $match: {
          orderCount: { $gt: 1 },
        },
      },
      {
        $group: {
          _id: { year: "$_id.year" },
          repeatCustomers: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
        },
      },
    ];

    const repeatCustomer = await order
      .aggregate(yearlyRepeatCustomersPipeline)
      .toArray();

    return repeatCustomer;
  } catch (err) {
    return new Error(err);
  }
};

const getCustomerByCity = async () => {
  try {
    const customer = await giveCollection("shopifyCustomers");

    const pipeline = [
      {
        $project: {
          city: "$default_address.city",
        },
      },

      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },

      {
        $sort: {
          _id: 1,
        },
      },
    ];

    const customerCity = await customer.aggregate(pipeline).toArray();
    return customerCity;
  } catch (err) {
    return new Error(err);
  }
};

export {
  getCustomerGrowthDayWise,
  getRepeatCustomerDayWise,
  getRepeatCustomerMonthWise,
  getRepeatCustomerQuaterWise,
  getRepeatCustomerYearWise,
  getCustomerByCity,
};
