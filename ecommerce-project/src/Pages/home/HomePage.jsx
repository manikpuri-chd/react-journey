import { Header } from "../../Components/Header";
import axios from 'axios';
import { useEffect , useState } from "react";
import "./HomePage.css";

import { ProductsGrid } from "./Products-Grid";


export function HomePage({cart}) {

  const[products, setProducts] = useState([])
  
  

  useEffect(()=>{
    
      axios.get('/api/products')
      
    
      .then((productsResponse) => {
        setProducts(productsResponse.data)
      })
      
  },[])
 
    

  return (
    <>
      <Header cart={cart} />

      <title>Ecommerce Homepage</title>
      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );

}