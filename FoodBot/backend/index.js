const express = require("express");
const { createOrder, createMenu } = require("./types");
const {  Menu, Order } = require("./db");
const cors = require("cors");
const app = express();
const axios = require('axios');

app.use(express.json());

app.use(cors());


app.post("/menu", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createMenu.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // put it in mongodb
    await Menu.create({
        itemName: createPayload.itemName,
          price: createPayload.price,
          description: createPayload.description
    })

    res.json({
        msg: "Menu created"
    })
})

app.post("/order", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createMenu.safeParse(createPayload);

   
    // put it in mongodb
    await Order.create({
        items: createPayload.items,
        total: createPayload.total
    })

    res.json({
        msg: "Menu created"
    })
})

app.get('/orders', async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post('/api/orders', async (req, res) => {
    try {
      const newOrder = new Order(req.body);
      await newOrder.save();
      res.status(201).send({ message: 'Order saved successfully', orderId: newOrder._id });
    } catch (error) {
      res.status(400).send({ message: 'Error saving order', error });
    }
  });
  

app.get('/menuview', async (req, res) => {
    try {
      // Query the database to get all menu items
      const menuItems = await Menu.find();
  
      // Send the menu items as a response
      res.json(menuItems);
    } catch (error) {
      // Handle errors
      console.error('Error fetching menu items:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(3000);