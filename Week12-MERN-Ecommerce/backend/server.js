const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect("mongodb://127.0.0.1:27017/mern_ecommerce")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Connection Error:", error);
    });

app.get("/", (req, res) => {
    res.json({
        message: "MERN E-Commerce Backend is running!"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});