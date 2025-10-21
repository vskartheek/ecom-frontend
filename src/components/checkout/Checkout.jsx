import { Step, StepLabel, Stepper } from '@mui/material'
import React, { useEffect } from 'react'
import AddressInfo from './address/AddressInfo';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserAddresses } from '../../store/actions';
import PaymentMethod from './payment method/PaymentMethod';
import toast from 'react-hot-toast';
import CustomLoader from '../shared/CustomLoader';
import Skeleton from '../shared/Skeleton';
import ErrorMessage from '../shared/ErrorMessage';
import OrderSummary from './order summary/OrderSummary';
import StripePayment from './stripe/StripePayment';
import PaypalPayment from './paypal/PaypalPayment';
const Checkout = () => {

  const [activeState,setActiveState]=React.useState(0);
  const {paymentMethod}=useSelector((state)=>state.paymentMethod)
  const {addresses,selectedAddress}=useSelector((state)=>state.auth)
  const {isLoading,errorMessage}=useSelector((state)=>state.errors)
  const {cart,totalPrice}=useSelector((state)=>state.carts)
  const steps=[
    "Address",
    "Payment Method",
    "Order Summary",
    "Payment"
  ]
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchUserAddresses())
  },[dispatch])

  const nextStephandler=()=>{
    if(activeState===0 && !selectedAddress){
      toast.error("Please select an address")
      return;
    }
    if (activeState===1 && !paymentMethod){
      toast.error("Please select a payment method")
      return;
    }
    setActiveState(activeState+1)
  }
  return (
    <div className='py-14 min-h-[calc(1oovh-100px)]'>
      <Stepper activeStep={activeState} alternativeLabel>
        {steps.map((step,index)=>{
          return <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        })}
      </Stepper>

      {isLoading ? (
        <Skeleton/>
      ):(
        <div className='mt-5'>
            {activeState===0 && <AddressInfo addresses={addresses}/>}
            {activeState===1 && <PaymentMethod selectedAddress={selectedAddress}/>}
            {activeState===2 && <OrderSummary totalPrice={totalPrice} cart={cart} paymentMethod={paymentMethod} address={selectedAddress}/>}
            {activeState===3 && (paymentMethod==="stripe" ? <StripePayment/>:<PaypalPayment/>)}
        </div>
      )}
      
      <div className='flex justify-between items-center px-4 fixed z-50 h-24 bottom-0 bg-white left-0 w-full py-4 border-s-slate-400'
      style={{boxShadow:"0 -2px 10px rgba(0,0,0,0.1)"}}
      >
        <button className={`px-4 py-2 bg-blue-600 ml-4 text-white hover:bg-blue-700 rounded ${activeState===0 && "opacity-50 cursor-not-allowed"}`}
        onClick={()=>activeState>0 && setActiveState(activeState-1)}
        >
          Back
        </button>
        {activeState !==steps.length-1 && (
        <button className={`px-4 py-2 bg-blue-600 mr-4 text-white rounded hover:bg-blue-700 
          ${ errorMessage||(
              (activeState===0 && !selectedAddress)||
              (activeState===1 && !paymentMethod)) ?"opacity-60":""
          }`}
        onClick={()=>nextStephandler()}
        disabled={errorMessage || (
              activeState===0 ? !selectedAddress
              : activeState===1 ? !paymentMethod
              : false
        )}
        >
          Next
        </button>
        )
        }
      </div>
      {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
    </div>
  )
}

export default Checkout