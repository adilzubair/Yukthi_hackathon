// OrderCard.jsx
const OrderCard = ({ order }) => {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Order #{order.id}</h2>
        <p className="text-gray-600 mb-4">{order.text}</p>
        {/* Additional order details */}
        <div className="flex justify-between items-center">
          {/* You can add buttons or other actions here */}
          <span className="text-sm text-gray-500">More details</span>
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            View
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderCard;
  