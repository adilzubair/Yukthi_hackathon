// OrderCard.jsx
import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="border p-4 rounded-md shadow">
      <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
      {order.items.map((item, index) => (
        <div key={index} className="mb-2">
          <p>{item.item}: {item.quantity} x ${item.price.toFixed(2)}</p>
        </div>
      ))}
      <p className="mt-4 font-bold">Total: ${order.total.toFixed(2)}</p>
    </div>
  );
};

export default OrderCard;
