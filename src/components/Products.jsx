import React from 'react'
import ProductCard from './ProductCard';
import { FaExclamationTriangle } from 'react-icons/fa';

const Products = () => {
    const isLoading=false;
    const errorMessage="";
    const products=[
        {
    productId:652,
    productName: "Rambo 1",
    image:"https://placehold.co/600x400",
    description: "Adjustable dumbbell set for home workouts, can be used indoors, outdoors, at your personal gym. This is available at lowest possible rates.",
    quantity: 90,
    price: 100.0,
    discount: 10.0,
    specialPrice:1305.0
    },

    {
    productId:652,
    productName: "Rambo 2",
    image:"https://placehold.co/600x400",
    description: "Adjustable dumbbell set for home workouts, can be used indoors, outdoors, at your personal gym. This is available at lowest possible rates.",
    quantity: 0,
    price: 100.0,
    discount: 10.0,
    specialPrice:1305.0
    }

    ]


  return (
    <>

    <div className='lg:px-14 sm:px-8 px-4 py-14 2xl:w-[90%] 2xl:mx-auto'>
        {isLoading?(
            <p>It is loading......</p>
        ): errorMessage?(
            <div className='flex justify-center items-center h-[200px]'>
                <FaExclamationTriangle className='text-slate-80 text-3xl mr-2'/>
                <span className='text-slate-800 text-lg font-medium'>{errorMessage}</span>
                
            </div>
        ):(
            <div className='min-h-[700px]'>
                <div className='pb-6 pt-14 grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 gap-y-6 gap-x-6'>
                    {products &&
                        products.map((item,i)=>
                            <ProductCard key={i} {...item}/>
                        )
                    }
                </div>
                
            </div>
        )
        }
    </div>

    </>
  )
  
}

export default Products