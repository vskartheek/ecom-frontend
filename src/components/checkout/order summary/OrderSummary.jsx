import React from 'react'
import { formatPrice } from '../../../utils/formatPrice'
const OrderSummary = ({totalPrice,cart,address,paymentMethod}) => {
return (
    <div className='container mx-auto px-4 py-6'>
            <div className='flex flex-col lg:flex-row w-full gap-6'>
                    <div className='w-full lg:w-8/12'>
                            <div className='space-y-4'>
                                    <div className='p-4 sm:p-6 border rounded-lg shadow-sm'>
                                            <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Billing Address</h2>
                                            <div className='space-y-2'>
                                                    <p className='flex flex-col sm:flex-row sm:gap-2'>
                                                            <strong className='min-w-fit'>Building Name:</strong>
                                                            <span className='break-words'>{address?.buildingName}</span>
                                                    </p>
                                                    <p className='flex flex-col sm:flex-row sm:gap-2'>
                                                            <strong className='min-w-fit'>City:</strong>
                                                            <span>{address?.city}</span>
                                                    </p>
                                                    <p className='flex flex-col sm:flex-row sm:gap-2'>
                                                            <strong className='min-w-fit'>State:</strong>
                                                            <span>{address?.state}</span>
                                                    </p>
                                                    <p className='flex flex-col sm:flex-row sm:gap-2'>
                                                            <strong className='min-w-fit'>Pincode:</strong>
                                                            <span>{address?.pincode}</span>
                                                    </p>
                                                    <p className='flex flex-col sm:flex-row sm:gap-2'>
                                                            <strong className='min-w-fit'>Country:</strong>
                                                            <span>{address?.country}</span>
                                                    </p>
                                            </div>
                                    </div>
                                    
                                    <div className='p-4 sm:p-6 border rounded-lg shadow-sm'>
                                            <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Payment Method</h2>
                                            <p className='capitalize flex flex-col sm:flex-row sm:gap-2'>
                                                    <strong className='min-w-fit'>Method:</strong>
                                                    <span>{paymentMethod}</span>
                                            </p>
                                    </div>

                                    <div className='p-4 sm:p-6 border rounded-lg shadow-sm'>
                                            <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Order Items</h2>
                                            <div className='space-y-4'>
                                                    {cart?.map((item,index)=>{
                                                            return <div key={index} className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
                                                                    <img src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`} alt={item.productName} className='w-full sm:w-20 h-48 sm:h-20 object-cover rounded'/>
                                                                    <div className='flex-1 space-y-1'>
                                                                            <h3 className='text-lg font-medium break-words'>{item.productName}</h3>
                                                                            <p className='text-gray-600 text-sm break-words'>{item.description}</p>
                                                                            <div className='grid grid-cols-2 sm:grid-cols-1 gap-1 text-sm text-gray-800'>
                                                                                    <p>Quantity: {item.quantity}</p>
                                                                                    <p>Price: {formatPrice(item.price)}</p>
                                                                                    <p>Total: {formatPrice(item.price*item.quantity)}</p>
                                                                            </div>
                                                                    </div>
                                                            </div>
                                                    })}
                                            </div>
                                    </div>
                            </div>
                    </div>
                    
                    <div className='w-full lg:w-4/12'>          
                            <div className='p-4 sm:p-6 border rounded-lg shadow-sm sticky top-4'>
                                    <h2 className='text-xl sm:text-2xl font-semibold mb-4'>Order Summary</h2>
                                    <div className='space-y-3'>
                                            <div className='flex justify-between text-sm sm:text-base'>
                                                    <span>Subtotal</span>
                                                    <span>{formatPrice(totalPrice)}</span>
                                            </div>
                                            <div className='flex justify-between text-sm sm:text-base'>
                                                    <span>Shipping</span>
                                                    <span>{formatPrice(0.00)}</span>
                                            </div>
                                            <hr className='my-3'/>
                                            <div className='flex justify-between font-bold text-lg sm:text-xl'>
                                                    <span>Total</span>
                                                    <span>{formatPrice(totalPrice)}</span>
                                            </div>
                                    </div>
                            </div>
                    </div>
            </div>
    </div>
)
}

export default OrderSummary