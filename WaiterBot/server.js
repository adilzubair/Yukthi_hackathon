const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Order schema
const orderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number, price: Number }],
  total: Number
});
const Order = mongoose.model('Order', orderSchema);

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/order', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).send({ message: 'Order saved', orderId: order._id });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
