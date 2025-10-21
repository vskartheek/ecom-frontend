import { Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {createNewCategory} from '../../../store/actions/adminActions';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
const NewCategoryForm = ({setOpen}) => {
  const {isLoading,errorMessage}=useSelector((state)=>state.errors);
  const [categoryName,setCategoryName]=React.useState("");
  const dispatch=useDispatch()
  const handleCategoryNameChange=(e)=>{
    setCategoryName(e.target.value);
  }

 const [errors, setErrors] = React.useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    } else if (categoryName.trim().length < 5) {
      newErrors.categoryName = 'Category name must be at least 5 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategoryNameCreation = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(createNewCategory(categoryName, toast, setOpen));
    }
  };

  return (
    <div className='py-4 relative h-full'>
      <form className='space-y-4' onSubmit={handleCategoryNameCreation}>
        <div className='ml-3 flex md:flex-row flex-col gap-4 w-full'>
          <div className='w-full'>
            <label htmlFor='categoryName' className='block text-lg font-semibold text-gray-700 mb-1'>
              Category Name
            </label>
            <input
              type='text'
              id='categoryName'
              name='categoryName'
              placeholder='Category Name'
              value={categoryName}
              onChange={handleCategoryNameChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 sm:text-lg p-2 ${
                errors.categoryName 
                  ? 'border-red-500 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
            />
            {errors.categoryName && (
              <p className='mt-1 text-sm text-red-600'>{errors.categoryName}</p>
            )}
          </div>
        </div>
        <div className='absolute bottom-4 left-0 right-0 flex justify-between px-4'>
            <Button 
                    disabled={isLoading}
                    onClick={()=>setOpen(false)} 
                    variant='contained'
                    sx={{
                            backgroundColor: '#e5e7eb',
                            color: '#000000',
                            '&:hover': {
                                    backgroundColor: '#d1d5db'
                            }
                    }}
            >
                    Cancel
            </Button>
            <Button 
                    variant='contained'
                    disabled={isLoading}
                    sx={{
                            backgroundColor: '#2563eb',
                            color: '#ffffff',
                            '&:hover': {
                                    backgroundColor: '#1d4ed8'
                            },
                            '&:disabled': {
                                    backgroundColor: '#9ca3af'
                            }
                    }}
                    type='submit'
            >
                      {isLoading ? 
                        (
                            <FaSpinner className='animate-spin' > Creating...</FaSpinner>
                        )
                      
                      : 'Create Category'}
            </Button>
        </div>
      </form>
    </div>
  )
}

export default NewCategoryForm