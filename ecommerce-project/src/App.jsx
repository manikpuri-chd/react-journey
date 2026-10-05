import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/home/HomePage";
import axios from "axios";
import { useState, useEffect } from "react";
import { CheckoutPage } from "./Pages/checkout/CheckoutPage";
import { OrdersPage } from "./Pages/orders/OrdersPage";
import { TrackingPage } from "./Pages/tracking/TrackingPage";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
      };
  useEffect(() => {
    
    loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking" element={<TrackingPage />} />
    </Routes>
  );
}

export default App;
