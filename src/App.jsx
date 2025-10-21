
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
import Login from './auth/Login'
import { useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'
import SignUp from './auth/SignUp'
import Checkout from './components/checkout/Checkout'
import PaymentConfirmation from './components/checkout/payment confirmation/PaymentConfirmation'
import AdminLayout from './components/admin/AdminLayout'
import AdminProducts from './components/admin/products/AdminProducts'
import Categories from './components/admin/categories/Categories'
import Sellers from './components/admin/sellers/Sellers'
import AdminDashboard from './components/admin/dashboard/AdminDashboard'
import Orders from './components/admin/orders/Orders'
function App() {
  const {user}=useSelector((state)=>state.auth)

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
          
          <Route path="/" element={<PrivateRoute publicPage/> }>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<SignUp/>}/>
          </Route>
          <Route path="/" element={<PrivateRoute/> }>
             <Route path="/checkout" element={<Checkout/>}/>
             <Route path="/order-confirm" element={<PaymentConfirmation/>}/>
             
          </Route>
          <Route path="/" element={<PrivateRoute adminOnly/> }>
              <Route path='/admin' element={<AdminLayout/>}>
              <Route index element={<AdminDashboard/>}/>
              <Route path='products' element={<AdminProducts/>}/>
              <Route path='categories' element={<Categories/>}/>
              <Route path='sellers' element={<Sellers/>}/>
              <Route path='orders' element={<Orders/>}/>
              </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster position='top-center'/>
  </React.Fragment>
  )
}

export default App
