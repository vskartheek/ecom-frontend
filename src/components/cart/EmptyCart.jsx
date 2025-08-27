import React from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import { MdArrowBack, MdShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className='lg:px-14 sm:px-8 px-4 py-10'>
             <div className='flex flex-col items-center mb-12'>
                 <h1 className='flex items-center gap-3 text-4xl font-bold text-gray-900'>
                   <FaShoppingCart size={36} className='text-gray-700'/>  Your Cart 
                 </h1>
                 <p className='text-lg text-gray-800 mt-2'>All Your Selected Items Here</p>
             </div>
     
             <div className='flex flex-col items-center justify-center mt-20 gap-6'>
                 <MdShoppingCart size={100} className='text-gray-300'/>
                 <h2 className='text-2xl font-semibold text-gray-700'>Your Cart is Empty</h2>
                 <Link to="/products" className='gap-2 flex  items-center mt-2 text-blue-600 hover:underline'>
                   <MdArrowBack size={20}/>
                  <span>Continue Shopping</span>
                 </Link>
             </div>
         </div>
  )
}

export default EmptyCart