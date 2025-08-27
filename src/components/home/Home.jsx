import React, { useEffect } from 'react'
import HeroBanner from './HeroBanner'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/actions'
import ProductCard from '../shared/ProductCard'
import CustomLoader from '../shared/CustomLoader'
import ErrorMessage from '../shared/ErrorMessage'

const Home = () => {
    const {products}=useSelector((state)=>state.products)
    const {isLoading,errorMessage}=useSelector((state)=>state.errors)
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
  return (
    <div className='lg:px-14 sm:px-8 px-4'>
        <div className="py-6">
            <HeroBanner/>
        </div>

        <div className='py-5'>
            <div className='flex flex-col justify-center items-center space-y-2'>
                <h1 className='text-slate-700 text-4xl font-bold'>
                    Products
                </h1>
                    <span className='text-slate-700'>
                        Discover Our Handpicked Selection of top-rated items just for you
                    </span>
            </div>
            {
            isLoading?(
                <CustomLoader />
            ):
            errorMessage?(
                <ErrorMessage errorMessage={errorMessage}/>
            ):(
            <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6'>
                    {products &&
                    products?.slice(0,6).map((item, i) =>
                            <ProductCard key={item.productId || i} {...item}/>
                    )
                }
                </div>
            )
            }
        </div>
    </div>
  )
}
export default Home