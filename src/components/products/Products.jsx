import React, { useEffect } from 'react'
import ProductCard from '../shared/ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories, fetchProducts } from '../../store/actions';
import Filter from './Filter';
import useProductFilter from '../../hooks/useProductFilter';
import CustomLoader from '../shared/CustomLoader';
import Paginations from '../shared/Paginations';
const Products = () => {
    const {isLoading,errorMessage}=useSelector((state)=>state.errors)
    const {products,pagination}=useSelector((state)=>state.products)
    const dispatch=useDispatch();
    
    useProductFilter();
    const {categories}=useSelector((state)=>state.categories)
    useEffect(()=>{
            dispatch(fetchCategories())
        },[])
  return (
    <>
    <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto'>
      
        <Filter categories={categories}/>
        {isLoading?(
            <CustomLoader/>
        ): errorMessage?(
            <div className='flex justify-center items-center h-[200px]'>
                <FaExclamationTriangle className='text-slate-80 text-3xl mr-2'/>
                <span className='text-slate-800 text-lg font-medium'>{errorMessage}</span>
                
            </div>
        ):(
            <div className='min-h-[700px]'>
                <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6'>
                    {products &&
                        products.map((item, i) =>
                            <ProductCard key={item.productId || i} {...item}/>
                        )
                    }
                    
                </div>
                <Paginations 
                    numberOfPages={pagination?.totalPages}
                    totalProducts={pagination?.totalElements}
                />
            </div>
            
        )}
        
    </div>
    </>
  )
  
}

export default Products