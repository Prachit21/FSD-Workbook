import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>

      {products.map(product => (
        <div key={product._id}>
          <h3>{product.title}</h3>
          <p>Price: ₹{product.price}</p>
        </div>
      ))}
    </div>
  );
}