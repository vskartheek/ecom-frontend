import React, { useEffect } from 'react'
import CategoriesTable from './CategoriesTable'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/actions';
import CustomLoader from '../../shared/CustomLoader';
import ErrorMessage from '../../shared/ErrorMessage';
import useCategoriesFilter from '../../../hooks/useCategoriesFilter';

const Categories = () => {
  const {categories,pagination}=useSelector((state)=>state.categories);
  const {isLoading,errorMessage}=useSelector((state)=>state.errors);
  const dispatch=useDispatch();
  useCategoriesFilter()
  if(isLoading){
    return (
      <CustomLoader/>
    )
  }
  if(errorMessage){
    return (
      <ErrorMessage message={errorMessage} />
    )
  }
  
  const emptyCategory=!categories || categories.length===0;
   return (
    <div className='pb-6 pt-20'>
      {emptyCategory ? 
        <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
          <div className='bg-gray-100 rounded-full p-6 mb-6'>
            <svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
            </svg>
          </div>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>No Categroies Created</h2>
          <p className='text-lg text-gray-600 mb-2'>Categories not created yet</p>
          <div className='mt-8 flex items-center space-x-2 text-blue-600'>
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
            </svg>
            <span className='text-sm'>Categories will automatically sync when created</span>
          </div>
        </div>
      : 
        <div className='container mx-auto px-4 flex items-center justify-center'>
          <CategoriesTable categories={categories} pagination={pagination}/>
        </div>
      }
    </div>
  )
}

export default Categories