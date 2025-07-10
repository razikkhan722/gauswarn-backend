const moment = require("moment/moment");
const { withConnection, calculateProfit } = require("../../utils/helper");

// final
exports.getFilteredPaymentData = async (filterType, month, year) => {
  try {
    let startDate, endDate;

    if (filterType === "last7days") {
      startDate = moment()
        .subtract(6, "days")
        .startOf("day")
        .format("YYYY-MM-DD");
      endDate = moment().endOf("day").format("YYYY-MM-DD");
    } else if (filterType === "monthly") {
      startDate = moment(`${year}-${month}-01`)
        .startOf("month")
        .format("YYYY-MM-DD");
      endDate = moment(`${year}-${month}-01`)
        .endOf("month")
        .format("YYYY-MM-DD");
    } else if (filterType === "yearly") {
      startDate = moment(`${year}-01-01`).format("YYYY-MM-DD");
      endDate = moment(`${year}-12-31`).format("YYYY-MM-DD");
    } else {
      throw new Error("Invalid filterType provided");
    }

    return await withConnection(async (connection) => {
      const dailyQuery = `
        SELECT 
          DATE_FORMAT(date, '%Y-%m-%d') AS day,
          COUNT(*) AS daily_total_users,
          SUM(user_total_amount) AS daily_total_sales
        FROM gauswarn_payment
        WHERE date BETWEEN ? AND ?
          AND status = 'captured'
        GROUP BY day;
      `;

      const summaryQuery = `
        SELECT 
          COUNT(*) AS total_users,
          SUM(user_total_amount) AS total_sales
        FROM gauswarn_payment
        WHERE date BETWEEN ? AND ?
          AND status = 'captured';
      `;

      const profitDataQuery = `
        SELECT 
          user_total_amount, purchase_price, product_quantity
        FROM gauswarn_payment
        WHERE date BETWEEN ? AND ?
          AND status = 'captured';
      `;

      const totalOrdersQuery = `
        SELECT COUNT(*) AS total_orders
        FROM gauswarn_payment
        WHERE date BETWEEN ? AND ?
          AND status = 'captured';
      `;

      const totalProductsQuery = `
        SELECT COUNT(*) AS total_products
        FROM gauswarn_product;
      `;

      const topUsersQuery = `
        SELECT *
        FROM gauswarn_payment
        WHERE date BETWEEN ? AND ?
          AND status = 'captured';
      `;

      const recentOrdersQuery = `
        SELECT *
        FROM gauswarn_payment
        WHERE status = 'captured'
        ORDER BY date DESC, time DESC
        LIMIT 10;
      `;

      const [
        [dailyDataRows],
        [[summaryData]],
        [profitRawRows],
        [[ordersData]],
        [[productsData]],
        [topUsers],
        [recentOrders],
      ] = await Promise.all([
        connection.execute(dailyQuery, [startDate, endDate]),
        connection.execute(summaryQuery, [startDate, endDate]),
        connection.execute(profitDataQuery, [startDate, endDate]),
        connection.execute(totalOrdersQuery, [startDate, endDate]),
        connection.execute(totalProductsQuery),
        connection.execute(topUsersQuery, [startDate, endDate]),
        connection.execute(recentOrdersQuery),
      ]);

      let totalProfit = 0;
      for (const row of profitRawRows) {
        totalProfit += calculateProfit(
          row.user_total_amount,
          row.purchase_price,
          row.product_quantity
        );
      }

      return {
        filterType,
        start: startDate,
        end: endDate,
        summary: summaryData,
        dailyBreakdown: dailyDataRows,
        monthlyProfit: totalProfit,
        totalOrders: ordersData.total_orders || 0,
        totalProducts: productsData.total_products || 0,
        topUsers,
        recentOrders,
      };
    });
  } catch (error) {
    console.error("Error in getFilteredPaymentData:", error);
    throw error;
  }
};
