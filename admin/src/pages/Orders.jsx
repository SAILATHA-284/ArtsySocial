import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets.js';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + '/api/order/list',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async(event, orderId)=>{
    try{
      const response = await axios.post( backendUrl + '/api/order/status',
        {orderId, status:event.target.value},
        { headers: { Authorization: `Bearer ${token}` } })
        if(response.data.success){
          await fetchAllOrders();
        }
    }catch(error){
      console.log(error);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h3 className="text-2xl font-semibold mb-6">All Orders</h3>
      <div className="space-y-6">
        {orders.map((order, index) => (
          <div key={index} className="border p-4 rounded-md shadow grid grid-cols-1 sm:grid-cols-4 gap-4 bg-white">
            
            {/* 1st Column - User & Address */}
            <div className="space-y-1 text-sm text-gray-700">
              <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
              <p><strong>Street:</strong> {order.address.street}</p>
              <p><strong>Location:</strong> {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}</p>
              <p><strong>Phone:</strong> {order.address.phone}</p>
            </div>

            {/* 2nd Column - Items, Date, Payment */}
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <img src={assets.parcel_icon} alt="parcel" className="w-8 h-8" />
                <div>
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.name} x {item.quantity}
                      {i !== order.items.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
              <p><strong>Items:</strong> {order.items.length}</p>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* 3rd Column - Amount */}
            <div className="text-sm text-gray-700 font-bold flex items-center justify-center">
              {currency}{order.amount}
            </div>

            {/* 4th Column - Status */}
            <div className="flex items-center justify-center">
              <select onChange={(event)=>statusHandler(event, order._id)}
                value={order.status}
                className="p-2 border rounded font-semibold text-sm bg-gray-100"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
