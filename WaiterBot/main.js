const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = import('node-fetch');
const { OpenAI } = require('openai');
require("dotenv").config();
const axios = require('axios'); // Import Axios
const mongoose = require('mongoose');


const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });


// Simulated menu items
const menuItems = [
    { name: "Pizza", price: 10 },
    { name: "Soda", price: 3 }
];

async function fetchReplyFromOpenAI(messages) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role" : "system" , "content" : "You are a helpful waiter that matches the vibe of the conversation. Ultimately your goal is to SUBTLY make the users check out the menu and order food. You can provide information about the menu, take orders, and answer questions. Always introduce yourself at the start of the conversation. Try to answer any other queries the users might have about you or the food before SUBTLY pushing the menu onto them." },
                  {"role" : "user" , "content" : "Hi"},
                  {"role" : "assistant" , "content" : "Hello! I am FoodBot your virtual waiter. How may I help you today."},
                  {"role" : "user" , "content" : "Are all the items on the menu being served today." },
                  {"role" : "assistant" , "content" : "Yes, everything shown on the menu is available today. Would you like to place the oder if you are ready?"},
                  {"role" : "assistant" , "content" : "If you have any further queries, feel free to ask me."},
                  {"role" : "user" , "content" : "Hows your day been so far"},
                  {"role" : "assistant" , "content" : "Its been good. How about you?"},
                  {"role" : "user" , "content" :"Im kinda having a bad day."},
                  {"role" : "assistant" , "content" : "How about some good food to brighten up the rest of the day."},
                  {"role" : "user" , "content" : "Sup Bro"},
                  {"role" : "assistant" , "content" : "Always great to have more customers. Im FoodBot your virtual waiter. What would you like to have today?"}]
      });
  
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      throw error;
    }
  }
  

let pendingOrders = {}; // Store pending orders before confirmation

const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});


// Define menu schema
const menuSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Define Mongoose model
const Menu = mongoose.model('Menu', menuSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI
).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


client.on('message', async msg => {
    if (msg.body.toLowerCase().includes('menu')) {
        let menuString = "Here's our menu:\n";
        try {
            const menuItems = await Menu.find(); // Fetch menu items from MongoDB

            menuItems.forEach(item => {
                menuString += `${item.itemName} - $${item.price}\n`;
            });

            msg.reply(menuString + "\nWhat would you like to order? Just let me know in a message. Please give quantity followed by item.");
        } catch (error) {
            console.error('Error fetching menu items:', error);
            msg.reply("Sorry, there was an error fetching the menu items. Please try again later.");
        }
     } else if (msg.body.toLowerCase() === 'confirm') {
        if (pendingOrders[msg.from]) {
            const orderDetails = pendingOrders[msg.from];
            const orderDetailsJson = JSON.stringify(orderDetails, null, 2); // Pretty print JSON
            console.log("Order confirmed:", orderDetailsJson); // Log order in JSON format to the console
            

            try {
                // Make a POST request to your backend endpoint (/order) with the order details
                const response = await axios.post('http://localhost:3000/order', orderDetails);
                console.log('Order saved:', response.data); // Log the response from the backend
                msg.reply(`Thank you! Your order has been confirmed with the total of $${orderDetails.total}`);
            } catch (error) {
                console.error('Error saving order:', error);
                msg.reply('There was an error processing your order. Please try again later.');
            }
            

            delete pendingOrders[msg.from]; // Clean up the pending order
        } else {
            msg.reply("You don't have any pending orders to confirm.");
        }
    } else {
        let orderSummary = [];
        let total = 0;
        const orderRegex = /(\d+)\s*(pizza|dosa|coffee|biriyani)s?/gi; // Enhanced regex to include item names directly
        
        let match;
        while ((match = orderRegex.exec(msg.body.toLowerCase())) !== null) {
            const quantity = parseInt(match[1], 10);
            const itemName = match[2]; // Keep item name in lower case for database matching

            try {
                // Fetch the item price from your database
                const menuItem = await Menu.findOne({ itemName: new RegExp('^' + itemName + '$', 'i') });
                if (menuItem) {
                    const itemPrice = menuItem.price;
                    total += quantity * itemPrice;
                    orderSummary.push({ item: menuItem.itemName, quantity: quantity, price: itemPrice, total: quantity * itemPrice });
                } else {
                    msg.reply(`Sorry, we couldn't find "${itemName}" in our menu.`);
                    return; // Exit if an item is not found
                }
            } catch (error) {
                console.error('Error fetching item from DB:', error);
                msg.reply('Sorry, there was an error processing your order. Please try again.');
                return; // Exit on error
            }
        }

        if (orderSummary.length > 0) {
            let orderSummaryText = "Here's your order summary:\n";
            orderSummary.forEach(item => {
                // Corrected usage of template literals
                orderSummaryText += `${item.quantity} x ${item.item} - $${item.total}\n`;
            });
            orderSummaryText += `Total: $${total}\nReply with "confirm" to place your order.`;
            pendingOrders[msg.from] = { items: orderSummary, total: total }; // Temporarily store the order
            msg.reply(orderSummaryText);
        } else {
            // This part remains unchanged - fallback to OpenAI or any other logic you have for non-order messages
            const replyText = await fetchReplyFromOpenAI(msg.body);
            msg.reply(replyText);
        }
    }
});

client.initialize();