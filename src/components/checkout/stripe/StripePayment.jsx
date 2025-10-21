import { loadStripe } from '@stripe/stripe-js'
import React, { use, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchClientSecretKey } from '../../../store/actions'
import PaymentForm from '../PaymentForm'
import ErrorMessage from '../../shared/ErrorMessage'
import { Elements } from '@stripe/react-stripe-js'

const StripePayment = () => {

  const stripePromise=loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  const {clientSecretKey}=useSelector((state)=>state.auth)
  const {totalPrice}=useSelector((state)=>state.carts)
  const {isLoading,errorMessage}=useSelector((state)=>state.errors)
  const {user,selectedAddress}=useSelector((state)=>state.auth)

  const dispatch=useDispatch()
  useEffect(()=>{
    if(!clientSecretKey){
      const sendData={
        amount: Number(totalPrice)*100,
        currency:"USD",
        email:user.email,
        name:`${user.username}`,
        address:selectedAddress,
        description:`Order for ${user.email}`,
        metadata:{
          test:"1"
        }
      }
    dispatch(fetchClientSecretKey(sendData))
    }
  },[clientSecretKey])
  return (
    <div>
      <>
            {clientSecretKey && 
              (
                <Elements stripe={stripePromise} options={{clientSecret:clientSecretKey}}>
                  <PaymentForm clientSecret={clientSecretKey} totalPrice={totalPrice}/>
                  </Elements>
              )
            }
            {isLoading && <CustomLoader/> }
            {errorMessage && <ErrorMessage message={errorMessage}/>}
      </>
    </div>
  )
}

export default StripePayment