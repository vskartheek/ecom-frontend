import { Skeleton } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useState } from 'react'

const PaymentForm = ({clientSecret,totalPrice}) => {

    const stripe=useStripe();
    const elements=useElements();
    const [errorMessage,setErrorMessage]=useState("");
    const handleSubmit=async(e)=>{
        e.preventDefault();
        if(!stripe || !elements){
            return;
        }

        const {error:submitError}=await elements.submit();

        const {error}=await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams:{
            return_url:`${import.meta.env.VITE_FRONTEND_URL}/order-confirm`,
            },
        });
        if(error){
            setErrorMessage(error.message);
            return false;
        }
    }

    const options={
        layout:"tabs"
    }
    const loading=!clientSecret || !stripe || !elements
  return (
    <form action="" onSubmit={handleSubmit} className='max-w-lg mx-auto p-4'>
        <h2 className='text-xl font-semibold mb-4'>Payment Information</h2>
            {loading ? (
                <Skeleton/>
            ):(
                <>
                {clientSecret && <PaymentElement options={options}/>}
                {errorMessage &&(
                    <div className='text-red-600 mt-2'>{errorMessage}</div>
                )}

                <button
                disabled={!stripe||loading}
                className='mt-4 px-4 py-2 w-full bg-black text-white rounded hover:bg-white hover:text-black border border-black transition-all'
                >
                    {!loading? `PAY $${Number(totalPrice).toFixed(2)}`:"Processing..."}
                </button>
                </>
            )}
    </form>
  )
}

export default PaymentForm