// app.js
const express = require("express");
const cors = require("cors");

const productRouter = require("./routes/product.routes");

const app = express();
const PORT = 3022;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/products", productRouter);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "API de productos funcionando (Node.js)" });
});

// Init server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
