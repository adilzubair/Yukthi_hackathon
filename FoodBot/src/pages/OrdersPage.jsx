// OrdersPage.jsx
import React, { useState, useEffect } from 'react';
import OrderCard from '.././components/OrderCard';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  // Placeholder for fetching orders from the backend
  useEffect(() => {
    // Replace with your actual backend API call
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3000/orders');
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Current Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
