const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/fsd_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  title: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

// GET - Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// POST - Add a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// PUT - Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// DELETE - Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product Deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Start Server
app.listen(5000, () => {
  console.log('Express running on 5000');
});