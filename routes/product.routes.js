// routes/product.routes.js
const express = require("express");
const router = express.Router();

const {
  addProduct,
  listProducts,
  removeProduct,
} = require("../services/product.service");

// POST /products
router.post("/", async (req, res) => {
  try {
    const newProduct = await addProduct(req.body);

    return res.status(201).json({
      id: newProduct.id,
      name: newProduct.name,
      price: newProduct.price,
      stock: newProduct.stock,
    });
  } catch (err) {
    return res.status(400).json({ detail: err.message });
  }
});

// GET /products
router.get("/", async (req, res) => {
  const products = await listProducts();

  return res.json(
    products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      stock: p.stock,
    }))
  );
});

// DELETE /products/:id
router.delete("/:productId", async (req, res) => {
  try {
    await removeProduct(req.params.productId);
    return res.status(204).send();
  } catch (err) {
    return res.status(404).json({ detail: err.message });
  }
});

module.exports = router;
