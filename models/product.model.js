// models/product.model.js
const { getConnection } = require("../db");

class Product {
  constructor(id, name, price, stock) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }
}

async function createTableIfNotExists() {
  const conn = await getConnection();
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price FLOAT NOT NULL,
      stock INT NOT NULL
    )
  `);
  await conn.end();
}

async function insertProduct(name, price, stock) {
  const conn = await getConnection();
  const [result] = await conn.execute(
    "INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock]
  );
  const newId = result.insertId;
  await conn.end();

  return new Product(newId, name, price, stock);
}

async function getAllProducts() {
  const conn = await getConnection();
  const [rows] = await conn.execute("SELECT * FROM products");
  await conn.end();

  return rows.map((row) => new Product(row.id, row.name, row.price, row.stock));
}

async function deleteProduct(productId) {
  const conn = await getConnection();
  const [result] = await conn.execute("DELETE FROM products WHERE id = ?", [
    productId,
  ]);
  await conn.end();

  return result.affectedRows > 0;
}

module.exports = {
  Product,
  createTableIfNotExists,
  insertProduct,
  getAllProducts,
  deleteProduct,
};
