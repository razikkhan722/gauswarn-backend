const express = require("express");
const router = express.Router();

// Middleware
const { errorHandler } = require("../../middlewares/errorHandler");
const { authMiddleware } = require("../../middlewares/authMiddleware");

// Controllers
// Admin
const registerController = require("../../controllers/admin/registerController");
const loginController = require("../../controllers/admin/loginController");
const forgotPasswordController = require("../../controllers/admin/forgotPasswordController");
const userInfoController = require("../../controllers/admin/userInfoController");
const monthlyReportController = require("../../controllers/admin/monthlyReportController");

// Rajlaxmi
const productControllerRajlaxmi = require("../../controllers/users/rajlaxmi/productController");
const feedbackRajlaxmiController = require("../../controllers/users/rajlaxmi/feedbackController");
const contactControllerRajlaxmi = require("../../controllers/users/rajlaxmi/contactController");

// Gauswarn
const productControllerGauswarn = require("../../controllers/users/gauswarn/productController");
const feedbackGauswarnController = require("../../controllers/users/gauswarn/feedbackController");
const contactControllerGauswarn = require("../../controllers/users/gauswarn/contactController");

// ----------------------------
// Admin Routes
// ----------------------------
router.post("/register", registerController.adminUserRegister);
router.post("/login", loginController.adminUserLogin);
router.post("/forgetPassword", forgotPasswordController.forgetPassword);
router.post("/reset", forgotPasswordController.passwordReset);
router.post("/verifyOtp", forgotPasswordController.verifyOtp);

router.get("/me", authMiddleware, registerController.meAPI);
router.get("/getAllCustomer", authMiddleware, userInfoController.getAllUserInfo);
router.get("/getAllOrderDetails", authMiddleware, userInfoController.getAllOrderDetails);
router.post("/getAllSales", authMiddleware, monthlyReportController.getAllSales);

// ----------------------------
// Rajlaxmi Routes
// ----------------------------
// Products
router.post("/createProductRajlaxmi", productControllerRajlaxmi.addProduct);
router.post("/updateProductById", productControllerRajlaxmi.updateProduct);
router.post("/deleteProductRajlaxmiById/:product_id", productControllerRajlaxmi.deleteProduct);
router.get("/getAllProductsWithFeedback", productControllerRajlaxmi.getAllProductsWithFeedback);

// Feedback
router.post("/createFeedbackRajlaxmi", feedbackRajlaxmiController.createReview);
router.get("/getAllFeedbackRajlaxmi", feedbackRajlaxmiController.getAllReviews);
router.get("/getSingleFeedbackRajlaxmiById/:id", feedbackRajlaxmiController.getReviewById);
router.put("/updateFeedbackRajlaxmiById/:id", feedbackRajlaxmiController.updateReview);
router.delete("/deleteFeedbackRajlaxmiById/:id", feedbackRajlaxmiController.deleteReview);

// Contact
router.post("/createContactRajlaxmi", contactControllerRajlaxmi.createContact);
router.get("/getAllContactRajlaxmi", contactControllerRajlaxmi.getAllContacts);
router.get("/getSingleContactRajlaxmiById/:id", contactControllerRajlaxmi.getContactById);
router.put("/updateContactRajlaxmiById/:id", contactControllerRajlaxmi.updateContact);
router.delete("/deleteContactRajlaxmiById/:id", contactControllerRajlaxmi.deleteContact);

// ----------------------------
// Gauswarn Routes
// ----------------------------
// Products
router.post("/createProductGauswarn", productControllerGauswarn.addProduct);
router.post("/updateGauswarnProductById", productControllerGauswarn.updateProductPrices);
router.post("/deleteGauswarnProductById", productControllerGauswarn.deleteProduct);
router.get("/gauswarnGetAllProduct", productControllerGauswarn.getAllProducts);

// Feedback (auth-protected)
router.get("/allfeedback", authMiddleware, feedbackGauswarnController.getReviews);
router.post("/createFeedback", authMiddleware, feedbackGauswarnController.feedback);
router.post("/getSingleFeedbackById/:id", authMiddleware, feedbackGauswarnController.getReviewById);
router.put("/updateFeedbackById/:id", authMiddleware, feedbackGauswarnController.updateReviewById);
router.delete("/deleteFeedbackById/:id", authMiddleware, feedbackGauswarnController.deleteReviewById);

// Contact (auth-protected)
router.get("/getAllContact", authMiddleware, contactControllerGauswarn.getAllContact);

// ----------------------------
// Global Error Handler
// ----------------------------
router.use(errorHandler);

module.exports = router;
