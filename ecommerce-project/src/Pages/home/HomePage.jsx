import { Header } from "../../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./HomePage.css";

import { ProductsGrid } from "./Products-Grid";

export function HomePage({ cart ,loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeData = async () => {
      const response = await axios.get("/api/products");

      setProducts(response.data);
    };
    getHomeData();
  }, []);

  return (
    <>
      <Header cart={cart} />

      <title>Ecommerce Homepage</title>
      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}
