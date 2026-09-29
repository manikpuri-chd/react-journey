import {Routes , Route} from 'react-router'
import { HomePage } from './Pages/HomePage'
import axios from 'axios';
import { useState,useEffect } from 'react';
import { CheckoutPage } from './Pages/CheckoutPage'
import { OrdersPage } from './Pages/OrdersPage'
import { TrackingPage } from './Pages/TrackingPage'
import './App.css'


function App() {

  const[cart, setCart] = useState([])

  useEffect(()=>{
    axios.get('/api/cart-items?expand=product')
    .then((Response)=>{
      setCart(Response.data)
    })
  },[])
  
  return (
    <Routes>
      <Route index element={<HomePage cart ={cart}/>} />
      <Route path="checkout" element ={<CheckoutPage cart ={cart} />} /> 
      <Route path="orders" element = {<OrdersPage />} />
      <Route path="tracking" element ={<TrackingPage />}/>
    </Routes>
    )
}

export default App
