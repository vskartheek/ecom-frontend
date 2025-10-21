import { Skeleton } from '@mui/material';
import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom'
import { stripePaymentConfirmation } from '../../../store/actions';
import toast from 'react-hot-toast';

const PaymentConfirmation = () => {
    const location=useLocation();
    const searchParams=new URLSearchParams(location.search);
    const dispatch=useDispatch();
    const {cart}=useSelector((state)=>state.carts)
    const [loading,setLoading]=React.useState(false);
    const [errorMessage,setErrorMessage]=React.useState("");
    const paymentIntent=searchParams.get("payment_intent");
    const clientSecret=searchParams.get("payment_intent_client_secret");
    const redirectStatus=searchParams.get("redirect_status");
      useEffect(()=>{
        if(paymentIntent && clientSecret && redirectStatus && cart && cart.length>0){
            const data={
                addressId:localStorage.getItem("selectedAddress")?JSON.parse(localStorage.getItem("selectedAddress")).addressId:"",
                pgName:localStorage.getItem("paymentMethod")?localStorage.getItem("paymentMethod"):"",
                pgPaymentId:paymentIntent,
                pgStatus:redirectStatus,
                pgResponseMessage:"Payment successfull",

            }
            dispatch(stripePaymentConfirmation(data,setErrorMessage,setLoading,toast))
        }
    },[paymentIntent,clientSecret,redirectStatus,cart])
  return (
    <div className='min-h-[80vh] flex items-center justify-center'>
        {loading ?(
            <div className='max-w-lg mx-auto p-4 text-center'>
                <Skeleton/>
            </div>
        ):(
            <div className='p-8 rounded-lg shadow-lg text-center max-w-md mx-auto'>
                <div className='mb-4 text-green-500 flex justify-center'>
                    <FaCheckCircle size={48}/>
                </div>
                <h2 className='text-3xl font-bold text-gray-800 mb-2'>Payment Successfull</h2>
                <p> Thank you for your purchase! your payment was Successfull</p>
            </div>
        )}
    </div>
  )
}

export default PaymentConfirmation