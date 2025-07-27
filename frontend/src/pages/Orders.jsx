import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(`${backendUrl}/api/order/userorders`, {}, {
        headers: { token }
      });

      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item['status'] = order.status;
            item['payment'] = order.payment;
            item['paymentMethod'] = order.paymentMethod;
            item['date'] = order.date;
            allOrderItems.push(item);
          });
        });
        setOrderData(allOrderItems.reverse());
      }

    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16 px-4 sm:px-8">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="space-y-6">
        {orderData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 border rounded-lg p-4 shadow-sm"
          >
            {/* Column 1 */}
            <div className="flex gap-4">
              <img src={item.image[0]} alt="" className="w-20 h-20 object-cover rounded" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold">{item.name}</p>
                <p className="mt-1">Quantity: {item.quantity}</p>
                <p className="mt-1">Price: {currency}{item.price}</p>
                <p className="mt-1">Payment: {item.paymentMethod}</p>
                <p className="mt-1 text-gray-500 text-xs">
                  {new Date(item.date).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Column 2 - Status */}
            <div className="flex items-center md:justify-start gap-2 text-sm">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="text-gray-700">{item.status}</span>
            </div>

            {/* Column 3 - Track Button */}
            <div className="flex items-center md:justify-end">
              <button onClick={loadOrderData} className="bg-pink-800 text-white px-4 py-2 rounded hover:bg-pink-500 transition text-sm">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
