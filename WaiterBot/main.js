const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fetch = import('node-fetch');
const { OpenAI } = require('openai');
require("dotenv").config();
const axios = require('axios'); // Import Axios

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is also the default, can be omitted if the API key is set in the environment variables
  });


// Simulated menu items
const menuItems = [
    { name: "Pizza", price: 10 },
    { name: "Soda", price: 3 }
];

async function fetchReplyFromOpenAI(messages) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role" : "system" , "content" : "You are a helpful and polite waiter. You can provide information about the menu, take orders, and answer questions. Always introduce yourself at the start of the conversation. Try to get the customers to open the menu if they already have not." },
                  {"role" : "user" , "content" : "Hi"},
                  {"role" : "assistant" , "content" : "Hello! I am FoodBot you virtual waiter. How may I help you today."},
                  {"role" : "user" , "content" : "Are all the items on the menu being served today." },
                  {"role" : "assistant" , "content" : "Yes, everything shown on the menu is available today. Would you like to place the oder if you are ready?"},
                  {"role" : "assistant" , "content" : "If you have any further queries, feel free to ask me."}],
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

client.on('message', async msg => {
    if (msg.body.toLowerCase().includes('menu')) {
        let menuString = "Here's our menu:\n";
        menuItems.forEach(item => {
            menuString += `${item.name} - $${item.price}\n`;
        });
        msg.reply(menuString + "\nWhat would you like to order? Just let me know in a message.");
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
        // Enhanced parsing logic to handle multiple quantities
        const orderRegex = /(\d+)\s*(pizza|soda)s?/gi; // Adjust regex as needed
        let match;
        while ((match = orderRegex.exec(msg.body.toLowerCase())) !== null) {
            const quantity = parseInt(match[1], 10);
            const itemName = match[2].charAt(0).toUpperCase() + match[2].slice(1); // Capitalize first letter
            const itemPrice = menuItems.find(item => item.name.toLowerCase() === match[2]).price;
            total += quantity * itemPrice;
            orderSummary.push({ item: itemName, quantity: quantity, price: itemPrice, total: quantity * itemPrice });
        }

        if (orderSummary.length > 0) {
            let orderSummaryText = "Here's your order summary:\n";
            orderSummary.forEach(item => {
                orderSummaryText += `${item.quantity} x ${item.item} - $${item.total}\n`;
            });
            orderSummaryText += `Total: $${total}\nReply with "confirm" to place your order.`;
            pendingOrders[msg.from] = { items: orderSummary, total: total }; // Temporarily store the order
            msg.reply(orderSummaryText);
        } else {
            const replyText = await fetchReplyFromOpenAI(msg.body);
            msg.reply(replyText);
        }
    }
});

client.initialize();