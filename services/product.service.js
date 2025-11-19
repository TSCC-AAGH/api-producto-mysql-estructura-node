// services/product.service.js
const {
  insertProduct,
  getAllProducts,
  deleteProduct,
  createTableIfNotExists,
} = require("../models/product.model");

// Create table on startup
createTableIfNotExists();

async function addProduct(data) {
  const { name, price, stock } = data;

  if (!name || price === undefined || stock === undefined) {
    throw new Error("Faltan campos requeridos: name, price, stock.");
  }

  if (price < 0) throw new Error("El precio no puede ser negativo.");
  if (stock < 0) throw new Error("El stock no puede ser negativo.");

  return await insertProduct(name, price, stock);
}

async function listProducts() {
  return await getAllProducts();
}

async function removeProduct(productId) {
  const deleted = await deleteProduct(productId);
  if (!deleted) throw new Error("Producto no encontrado.");
}

module.exports = {
  addProduct,
  listProducts,
  removeProduct,
};
