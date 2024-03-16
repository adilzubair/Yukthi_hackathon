const mongoose = require("mongoose");

// mongodb+srv://kirags123:8qPEa8KTKBEh2bss@cluster0.f3qlbuo.mongodb.net/todos
// .env
mongoose.connect("mongodb+srv://@cluster0.9xqcfem.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

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
    items: [{
        item:  String,
        quantity: Number,
        price: Number,
        total: Number
      }],
   
    total: {
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
