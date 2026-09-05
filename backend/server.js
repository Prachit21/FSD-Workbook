const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/fsd_db')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error(err));

const productSchema = new mongoose.Schema({
  title: String,
  price: Number
});

const Product = mongoose.model('Product', productSchema);

app.listen(5000, () => {
  console.log('Express running on 5000');
});