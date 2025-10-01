import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../Context/StoreContext";

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const token = localStorage.getItem("token"); // 👈 get token
      const response = await axios.post(
        url + "/api/order/verify",
        { success, orderId },
        {
          headers: { Authorization: `Bearer ${token}` }, // 👈 send token
        }
      );

      if (response.data.success) {
        navigate("/myorders"); // 👈 now it will redirect
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Verify Payment Error:", error);
      navigate("/"); // fallback if something goes wrong
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
