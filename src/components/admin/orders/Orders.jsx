import React, { useEffect } from 'react'
import OrderTable from './OrderTable';
import Modal from '../../shared/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminOrders } from '../../../store/actions/adminActions';
import CustomLoader from '../../shared/CustomLoader';
import ErrorMessage from '../../shared/ErrorMessage';
import useOrderFilter from '../../../hooks/useOrderFilter';
const Orders = () => {
  const {adminOrders,pagination}=useSelector((state)=>state.order);
  const {isLoading,errorMessage}=useSelector((state)=>state.errors);
  useOrderFilter();
 
  // const adminOrders=[
  //   {
  //           "orderId": 1,
  //           "email": "user1@example.com",
  //           "orderDate": "2025-09-06",
  //           "totalAmount": 180.0,
  //           "orderStatus": "Order Accepted",
  //       },
  //       {
  //           "orderId": 2,
  //           "email": "user1@example.com",
  //           "orderDate": "2025-09-06",
  //           "totalAmount": 180.0,
  //           "orderStatus": "Order Accepted",
  //       },
  // ]
  // const pagination={
  //   "pageNumber": 0,
  //   "pageSize": 9,
  //   "totalElements": 9,
  //   "totalPages": 1,
  //   "lastPage": true
  // }
  const emptyOrder=!adminOrders || adminOrders.length===0;
  if(isLoading){
    return (
      <CustomLoader/>
    )
  } 
  if(errorMessage){
    return (
      <ErrorMessage message={errorMessage} />
    )
  }
  return (
    <div className='pb-6 pt-20'>
      {emptyOrder ? 
        <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
          <div className='bg-gray-100 rounded-full p-6 mb-6'>
            <svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
          </div>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>No Orders Yet</h2>
          <p className='text-lg text-gray-600 mb-2'>Your order history is empty</p>
          <p className='text-gray-500 max-w-md'>When customers place orders, they will appear here for you to manage and track.</p>
          <div className='mt-8 flex items-center space-x-2 text-blue-600'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span className='text-sm'>Orders will automatically sync when received</span>
          </div>
        </div>
      : 
        <div className='container mx-auto px-4'>
          <OrderTable 
            adminOrders={adminOrders} 
            pagination={pagination}
          />

        </div>
      }
    </div>
  )
}

export default Orders