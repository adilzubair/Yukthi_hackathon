const zod = require("zod");

const createMenu = zod.object({
    itemName: zod.string(),
    description: zod.string(),
    price: zod.number()
})

const OrderItemSchema = zod.object({
    itemId: zod.string(), // Assuming itemId is a string
    quantity: zod.number().int().positive() // Assuming quantity is a positive integer
  });

const createOrder = zod.object({
    itableNo: zod.number(),
    iitems: zod.array(OrderItemSchema),
    totalPrice: zod.number()


})

module.exports = {
    createMenu: createMenu,
    createOrder: createOrder
}