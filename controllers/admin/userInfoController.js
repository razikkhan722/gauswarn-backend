// Get All Products

const adminUserInfoModal = require("../../model/admin/userInfoModal");
const asyncHandler = require("express-async-handler");

exports.getAllUserInfo = asyncHandler(async (req, res) => {
  try {
    const customers = await adminUserInfoModal.getAllUserInfo(
      req?.query?.limit
    );
    res.json({ success: true, customers });
  } catch (error) {
    res.json({ error: "Failed to fetch products" });
  }
});

// get user details by payment table
exports.getAllOrderDetails = asyncHandler(async (req, res) => {
  try {
    const orderDetails = await adminUserInfoModal.getAllOrderDetails(
      req?.query?.limit
    );
    res.json({ success: true, orderDetails });
  } catch (error) {
    res.json({ error: "Failed to fetch products" });
  }
});
