
import { FaBeer } from 'react-icons/fa'
import './App.css'
import Products from './components/products/Products'

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/home/Home'
import Navbar from './components/shared/Navbar'
import About from './components/about/About'
import Contact from './components/contact/Contact'
import { Toaster } from 'react-hot-toast'
import React from 'react'
import Cart from './components/cart/Cart'
function App() {
  

  return (
  <React.Fragment>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/cart" element={<Cart/>}/>
        </Routes>
      </Router>
      <Toaster position='top-center'/>
  </React.Fragment>
  )
}

export default App
