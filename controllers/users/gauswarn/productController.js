const productModel = require("../../../model/users/gauswarn/productModal");

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      product_price,
      product_weight,
      product_purchase_price,
      product_del_price,
    } = req.body;

    if (
      !product_id ||
      !product_name ||
      !product_price ||
      !product_weight ||
      !product_purchase_price ||
      !product_del_price
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const insertedId = await productModel.addProduct(
      product_id,
      product_name,
      product_price,
      product_weight,
      product_purchase_price,
      product_del_price
    );

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      insertedId,
    });
  } catch (error) {
    console.error("Add product error:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.getAllProducts();
    res.json({ success: true, products });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const { product_id } = req.params;
    const products = await productModel.getProductById(product_id);
    if (!products) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }
    res.json({ success: true, products });
  } catch (error) {
    console.error("Fetch product error:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      product_price,
      product_weight,
      product_purchase_price,
      product_del_price,
    } = req.body;

    const isUpdated = await productModel.updateProduct(
      product_id,
      product_name,
      product_price,
      product_weight,
      product_purchase_price,
      product_del_price
    );

    if (!isUpdated) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const isDeleted = await productModel.deleteProduct(id);
    if (!isDeleted) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};

exports.updateProductPrices = async (req, res) => {
  try {
    const {
      product_price,
      product_purchase_price,
      product_del_price,
      product_weight,
      product_id,
    } = req.body;

    const isUpdated = await productModel.updateProductPrices(
      product_id,
      product_price,
      product_purchase_price,
      product_del_price,
      product_weight
    );

    if (!isUpdated) {
      return res
        .status(404)
        .json({ success: true, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};
