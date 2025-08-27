import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { MdArrowBack, MdShoppingCart } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ItemContent from './ItemContent'
import EmptyCart from './EmptyCart'
import { formatPrice } from '../../utils/formatPrice'

const Cart = () => {

  const dispatch=useDispatch();
  const {cart}=useSelector((state)=>state.carts)
  const newCart={...cart};
  newCart.totalPrice=cart?.reduce(
    (acc,curr)=>acc+(Number(curr?.specialPrice)*(curr?.quantity)),0
  )
  console.log(newCart);
  if(!cart || cart.length===0){
    return (
     <EmptyCart/>
    )
  }


  return (
    <div className='lg:px-14 sm:px-8 px-4 py-10'>
        <div className='flex flex-col items-center mb-12'>
            <h1 className='flex items-center gap-3 text-4xl font-bold text-gray-900'>
              <FaShoppingCart size={36} className='text-gray-700'/>  Your Cart 
            </h1>
            <p className='text-lg text-gray-800 mt-2'>All Your Selected Items Here</p>
        </div>

        <div className="grid md:grid-cols-5 grid-cols-4 gap-4 pb-2 font-semibold center">
                
                <div className='md:col-span-2 justify-self-start text-lg text-slate-800 lg:ps-4'>
                  Product
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                  Price
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                  Quantity
                </div>

                <div className='justify-self-center text-lg text-slate-800'>
                  Total
                </div>
        </div>

        <div>
          {cart && cart.length>0 &&
            cart.map((item,i)=><ItemContent key={i} {...item}/>)
          }
        </div>

        <div className='border-t-[1.5px] border-slate-200 py-4 flex sm:flex-row sm:px-0 px-2 flex-col sm:justify-between gap-4'>
            <div></div>
            <div className='flex text-sm gap-1 flex-col'>
                <div className='flex justify-between w-full md:text-lg text-sm font-semibold'>
                  <span>Subtotal</span>
                  <span>{formatPrice(newCart?.totalPrice)}</span>
                </div>
                <p className='text-slate-500'>
                  Taxes and shipping calculated at checkout
                </p>
                <Link to="/checkout" className='w-full flex  justify-end'>
                <button onClick={()=>{}}
                  className='font-semibold bg-blue-600 text-white text-center py-3 rounded-md w-full hover:bg-blue-700 transition duration-300'
                  >
                  Checkout
                </button>
                </Link>
                <Link to="/products" className='gap-2 flex  items-center mt-2 text-slate-500'>
                  <MdArrowBack size={20}/>
                 <span>Continue Shopping</span>
                </Link>

            </div>
        </div>

    </div>
  )
}

export default Cart