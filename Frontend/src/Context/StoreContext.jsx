import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFood_list] = useState([]);

  const addToCart = async(itemId) => {
    setCartItem((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{
  headers: { Authorization: `Bearer ${token}` }})
    }
  };

  const removeFromCart =async (itemId) => {
    setCartItem((prev) => ({
      ...prev,[itemId]:prev[itemId]-1
    }));
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers: { Authorization: `Bearer ${token}` }})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find(
          (product) => product._id.toString() === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  // function to fetch food list form the data base
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFood_list(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };
 const loadCartData = async (token) => {
  try {
    const response = await axios.get(url + "/api/cart/get", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Cart Response:", response.data);
    setCartItem(response.data.cartData); // this works because cartData is an object
  } catch (err) {
    console.error("Error loading cart:", err);
  }
};
  useEffect(() => {
  const loadData = async () => {
    await fetchFoodList();
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      await loadCartData(savedToken); // ✅ use the variable, not localStorage again
    }
  };
  loadData();
}, []);


  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
