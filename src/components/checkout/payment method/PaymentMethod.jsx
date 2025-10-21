import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createCart, setPaymentMethod } from '../../../store/actions'

const PaymentMethod = () => {
  const dispatch=useDispatch()
  const handleSelection=(method)=>{
    dispatch(setPaymentMethod(method))
  }
  const {cart,cartId}=useSelector((state)=>state.carts)
  const {errorMessage}=useSelector((state)=>state.errors)
  const {paymentMethod}=useSelector((state)=>state.paymentMethod)
  useEffect(()=>{
    if(cart.length>0 && !cartId && !errorMessage){
      const cartItems=cart.map((item)=>({
        productId:item.productId,
        quantity:item.quantity,
      }))
      dispatch(createCart(cartItems))
    }
  },[dispatch,cartId])

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method</h2>
      
      <div className="space-y-4">
        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            paymentMethod === 'stripe' 
              ? 'border-green-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleSelection('stripe')}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={() => handleSelection('stripe')}
              className="w-4 h-4 text-blue-600"
            />
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <span className="font-medium text-gray-700">Stripe</span>
            </div>
        </div>

        <div 
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            paymentMethod === 'paypal' 
              ? 'border-green-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => handleSelection('paypal')}
        >
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              name="payment"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={() => handleSelection('paypal')}
              className="w-4 h-4 text-blue-600"
            />
              <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="font-medium text-gray-700">PayPal</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod