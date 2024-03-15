const mongoose = require("mongoose");

// mongodb+srv://kirags123:8qPEa8KTKBEh2bss@cluster0.f3qlbuo.mongodb.net/todos
// .env
mongoose.connect("mongodb+srv://foodbot:QbmedfD6bvxmAB2a@cluster0.9xqcfem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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

  const Menu = mongoose.model('Menu', menuSchema);

  const orderSchema = new mongoose.Schema({
    tableNo: {
      type: Number,
      required: true
    },
    items: [{
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu' // Reference to the Item model
        },
        quantity: Number
      }],
    totalPrice: {
      type: Number,
      required: true
    }
  });

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });
  
  // Create a model from the schema
  const Order = mongoose.model('Order', orderSchema);
  
  // Create a model from the schema
  

module.exports = {
    Menu,
    Order
}