import React from 'react'
import { MdDelete } from 'react-icons/md';
import SetQuantity from './SetQuantity';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity, removeFromCart } from '../../store/actions';
import toast from 'react-hot-toast';
import { formatPrice } from '../../utils/formatPrice';
import  TruncateText from '../../utils/TruncateText.js';
const ItemContent = ({
    productId,
    productName,
    image,
    description,
    quantity,
    price,
    discount,
    specialPrice
}) => {
  const [currentQuantity,setCurrentQuantity]=React.useState(quantity);
  const dispatch=useDispatch();
  const handleQuantityIncrease=(cartItems)=>{
    dispatch(increaseCartQuantity(cartItems,toast,currentQuantity,setCurrentQuantity));

  }

  const handleQuantityDecrease=(cartItems)=>{
    if(currentQuantity>1){
      const newQty=currentQuantity-1;
      setCurrentQuantity(newQty);
      dispatch(decreaseCartQuantity(cartItems,newQty));
    }
  }

  const handleCartItemDelete=(productId)=>{
    dispatch(removeFromCart(productId));
    toast.success("Item removed from cart!")
  }
  return (
    <div className='grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4 items-center border-[1px] border-slate-50'>
      <div className='md:col-span-2 justify-self-start flex flex-col gap-2'>
        <div className='flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start'>
          <h3 className='lg:text-[17px] text-sm font-semibold text-slate-600'>
            {TruncateText(productName,20)}
          </h3>
        </div>
        <div className='md:w-36 sm:w-24 w-12'>
          <img alt={productName} className='md:h-36 sm:h-24 h-12 w-full object-cover rounded-md' src={image} />
        
        <div className='flex items-start gap-5 mt-3'>
          <button onClick={()=>{handleCartItemDelete(productId)}}
            className='flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200 '
            >
            <MdDelete size={16}/>
            Remove from cart
          </button>
          </div>
        </div>
      </div>
      <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            {formatPrice(specialPrice)}
      </div>

      <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            <SetQuantity quantity={currentQuantity}
            cardCounter={true}
            handleQtyDecrease={()=>{
              handleQuantityDecrease(
                {image,
                productName,
                description,
                specialPrice,
                price,
                productId,
                quantity}
              )
            }}
            handleQtyIncrease={()=>handleQuantityIncrease(
              {image,
              productName,
              description,
              specialPrice,
              price,
              productId,
              quantity}
            )}
            />
      </div>

      <div className='justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold'>
            {formatPrice(specialPrice*currentQuantity)}
      </div>
    </div>
  )
}

export default ItemContent