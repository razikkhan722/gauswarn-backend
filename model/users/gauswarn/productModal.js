const { withConnection } = require("../../../utils/helper");

// Add Product
exports.addProduct = async (
  product_id,
  product_name,
  product_price,
  product_weight,
  product_purchase_price,
  product_del_price
) => {
  try {
    return await withConnection(async (connection) => {
      const query = `
        INSERT INTO gauswarn_product 
        (product_id, product_name, product_price, product_weight, product_purchase_price, product_del_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const [result] = await connection.execute(query, [
        product_id,
        product_name,
        product_price,
        product_weight,
        product_purchase_price,
        product_del_price,
      ]);
      return result.insertId;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get All Products
exports.getAllProducts = async () => {
  try {
    return await withConnection(async (connection) => {
      const query = `SELECT * FROM gauswarn_product`;
      const [products] = await connection.execute(query);
      return products;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get Single Product by ID
exports.getProductById = async (id) => {
  try {
    return await withConnection(async (connection) => {
      const query = "SELECT * FROM gauswarn_product WHERE id = ?";
      const [product] = await connection.execute(query, [id]);
      return product.length > 0 ? product[0] : null;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Product
exports.updateProduct = async (
  product_id,
  product_name,
  product_price,
  product_weight,
  product_purchase_price,
  product_del_price
) => {
  try {
    return await withConnection(async (connection) => {
      const query = `
        UPDATE gauswarn_product
        SET product_name = ?, product_price = ?, product_weight = ?, product_purchase_price = ?, product_del_price = ?
        WHERE product_id = ?
      `;
      const [result] = await connection.execute(query, [
        product_name,
        product_price,
        product_weight,
        product_purchase_price,
        product_del_price,
        product_id,
      ]);
      return result.affectedRows > 0;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete Product
exports.deleteProduct = async (product_id) => {
  try {
    return await withConnection(async (connection) => {
      const query = "DELETE FROM gauswarn_product WHERE product_id = ?";
      const [result] = await connection.execute(query, [product_id]);
      return result.affectedRows > 0;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateProductPrices = async (
  product_id,
  product_price,
  product_purchase_price,
  product_del_price,
  product_weight
) => {
  try {
    return await withConnection(async (connection) => {
      const query = `
        UPDATE gauswarn_product
        SET product_price = ?, product_purchase_price = ?, product_del_price = ?,  product_weight = ?
        WHERE product_id = ?
      `;
      const [result] = await connection.execute(query, [
        product_price,
        product_purchase_price,
        product_del_price,
        product_weight,
        product_id,
      ]);
      return result.affectedRows > 0;
    });
  } catch (error) {
    throw new Error(error.message);
  }
};
