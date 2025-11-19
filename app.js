// app.js
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const productRouter = require("./routes/product.routes");

const app = express();
const PORT = 3022;

// Middlewares
app.use(cors());
app.use(express.json());

// Swagger
const swaggerDocument = YAML.load("./openapi-productos.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas de negocio
app.use("/products", productRouter);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API de productos funcionando (Node.js)" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Swagger UI en http://localhost:${PORT}/docs`);
});
