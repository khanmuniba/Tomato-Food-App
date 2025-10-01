import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'
import { useEffect } from "react";
const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItem, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    Country: "",
    Phone: "",
  });

  // input change handler
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({
      ...data, // keep old state
      [name]: value, // update only changed field
    }));
  };

  // submit handler
  const placeOrder = async (event) => {
    event.preventDefault();

    if (!cartItem || !food_list) {
      console.error("Cart or food_list not ready");
      return;
    }

    const orderItems = Object.keys(cartItem)
      .filter((id) => cartItem[id] > 0) // only items with quantity
      .map((id) => {
        const item = food_list.find((food) => String(food._id) === String(id));

        if (!item) {
          console.warn(`Item with id=${id} not found in food_list`);
          return null;
        }

        return {
          ...item,
          quantity: cartItem[id],
        };
      })
      .filter((item) => item !== null);

    let orderData={
      userId: localStorage.getItem("userId"),
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
let response = await axios.post(url + "/api/order/place",orderData,{headers: {Authorization: `Bearer ${token}`}});
if (response.data.success) {
  console.log("Order Response:", response.data); // 👈 check what backend sends
  const session_url = response.data.session_url;

  if (session_url) {
    window.location.href = session_url; // 👈 go to Stripe checkout
  } else {
    alert("No Stripe session URL received from backend");
  }
} else {
  alert("Error placing order: " + response.data.message);
}
  };
  const navigate = useNavigate();

useEffect(() => {
  if (!token) {
    navigate('/cart');
  } else if (getTotalCartAmount() === 0) {
    navigate('/cart');
  }
}, [token,getTotalCartAmount]);


  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
            required
          />
          <input
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
            required
          />
        </div>
        <input
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="text"
          placeholder="Email Address"
          required
        />
        <input
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
            required
          />
          <input
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            name="zipCode"
            onChange={onChangeHandler}
            value={data.zipCode}
            type="text"
            placeholder="Zip Code"
            required
          />
          <input
            name="Country"
            onChange={onChangeHandler}
            value={data.Country}
            type="text"
            placeholder="Country"
            required
          />
        </div>
        <input
          name="Phone"
          onChange={onChangeHandler}
          value={data.Phone}
          type="text"
          placeholder="Phone"
          required
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
              </b>
            </div>
            <button type="submit">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
