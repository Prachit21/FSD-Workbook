const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Prachit' }]);
});

app.post('/api/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User added', user: newUser });
});

app.listen(5000, () => console.log('Express running on 5000'));