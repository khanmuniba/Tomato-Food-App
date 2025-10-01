import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import './Orders.css';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(url + "/api/order/list");
      if (response.data.data) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("No orders found");
      }
    } catch (err) {
      toast.error("Error fetching orders");
      console.error(err);
    }
  };
// status handler 
const statusHandler=async(event,orderId)=>{
 const response=await axios.post(url+"/api/order/status",{
  orderId,
  status:event.target.value
 })
 if(response.data.success){
  await fetchOrders();
 }
}
  useEffect(() => {
    fetchOrders();
  }, []); 

  return (
    <div className='order add'>
      <h3>Order Page</h3>

      <div className='order-list'>
        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="parcel icon" />

              <div>
                <p className='order-item-food'>
                  {order.items.map((item, i) => 
                    i === order.items.length - 1
                      ? `${item.name} x ${item.quantity}`
                      : `${item.name} x ${item.quantity}, `
                  )}
                </p>

                <p className="order-item-name">
                  {order.address.firstName} {order.address.lastName}
                </p>

                <div className='order-item-address'>
                  <p>{order.address.street},</p>
                  <p>
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipCode}
                  </p>
                </div>

                <p className='order-item-phone'>{order.address.phone}</p>
              </div>

              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>

              <select onChange={()=>statusHandler(event,order._id)} value={order.status}>
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
