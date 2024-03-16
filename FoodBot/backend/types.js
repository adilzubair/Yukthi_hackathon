const zod = require("zod");

const createMenu = zod.object({
    itemName: zod.string(),
    description: zod.string(),
    price: zod.number()
})

const itemSchema = zod.object({
    item: zod.string(),
    quantity: zod.number(),
    price: zod.number(),
    total: zod.number(),
  });
  
  const createOrder = zod.object({
    items: zod.array(itemSchema),
    total: zod.number(),
  });

module.exports = {
    createMenu: createMenu,
    createOrder: createOrder
}