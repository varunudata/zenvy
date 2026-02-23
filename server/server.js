require("dotenv/config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4007;

const productRoutes = require("./src/routes/productRoutes");

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, status: "UP" });
});

app.listen(PORT, () => {
  console.log(`Server is running in the port : ${PORT}`);
});
