import React, { useEffect, useState } from 'react'
import api from '../../../api/api'
import CustomCard from '../../shared/CustomCard'
import { FaCashRegister, FaFolder, FaMoneyBill, FaReceipt, FaShoppingBag } from 'react-icons/fa'
import { formatPrice } from '../../../utils/formatPrice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAnalytics } from '../../../store/actions/adminActions'
import CustomLoader from '../../shared/CustomLoader'
const AdminDashboard = () => {
  const dispatch=useDispatch()
  const {analytics}=useSelector((state)=>state.admin)
  const {isLoading}=useSelector((state)=>state.errors)
  const formatNumber = (num) => {
      if (num === null || num === undefined) return '';
      num = Number(num);
      if (isNaN(num)) return num;
      if (num >= 1e9) return (num / 1e9).toFixed(2).replace(/\.00$/, '') + 'B';
      if (num >= 1e6) return (num / 1e6).toFixed(2).replace(/\.00$/, '') + 'M';
      if (num >= 1e3) return (num / 1e3).toFixed(2).replace(/\.00$/, '') + 'K';
      return num.toLocaleString();
    };
  useEffect(()=>{
    dispatch(fetchAnalytics())
  },[dispatch])
  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Admin Dashboard</h3>
  { isLoading ?(
    <CustomLoader/>
  ):(<div className='grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center'>
        <CustomCard cardName="Total Products" cardValue={analytics.productCount} cardIcon={<FaShoppingBag/>}/>
        <CustomCard cardName="Total Categories" cardValue={analytics.totalCategories} cardIcon={<FaFolder/>}/>
        <CustomCard cardName="Total Orders" cardValue={analytics.totalOrders} cardIcon={<FaReceipt/>}/>
        <CustomCard cardName="Total Revenue" cardValue={`$${formatNumber(analytics.totalRevenue)}`} cardIcon={<FaMoneyBill/>}/>
      </div> )}
    </div>
  )
}

export default AdminDashboard