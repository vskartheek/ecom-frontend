import React, { useEffect } from 'react'
import InputField from '../../shared/InputField'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { Button } from '@mui/material';
import { fetchCategories } from '../../../store/actions';
import {addAdminProducts, updateAdminProducts } from '../../../store/actions/adminActions';
import toast from 'react-hot-toast';

const   ProductUpdateForm = ({
            setOpen,
            product,
            update=false
}) => {
  const {isLoading,errorMessage}=useSelector((state)=>state.errors);
  const {categories}=useSelector((state)=>state.categories);
  const [categoryId,setCategoryId]=React.useState("");
  const dispatch=useDispatch();
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset,
    setValue,
  }=useForm(
    {
      mode:"onTouched"
    }
  )
  useEffect(()=>{
    dispatch(fetchCategories())
    if(update && product){
      setValue("productName",product.productName);
      setValue("price",product.price);
      setValue("discount",product.discount);
      setValue("quantity",product.quantity);
      setValue("specialPrice",product.specialPrice);
      setValue("description",product.description);
    }
  },[update,product])

  const saveProductHandler=async (data)=>{
    if(!update){
      const sendData={
        ...data,
      }
      
      dispatch(addAdminProducts(sendData,toast,setOpen,categoryId))
    }else{
      const sendData={
        ...data,
        productId:product.id
      }
      console.log(sendData);
      dispatch(updateAdminProducts(sendData,toast,setOpen));
    }
  }
  return (
    <div className='py-5 relative h-full'>
      <form onSubmit={handleSubmit(saveProductHandler)} className='space-y-4'>
        <div className='ml-3 flex md:flex-row flex-col gap-4 w-full'>
          <InputField
          label="Product Name"
          id="productName"
          type="text"
          register={register}
          message={"*This field is required"}
          error={errors}
          required={true}
          placeHolder="Product Name"
          className="w-full"
          />
        </div>

        <div className='ml-3 flex md:flex-row flex-col gap-4 w-full'>
          <InputField
          label="Price"
          id="price"
          type="number"
          register={register}
          message={"*This field is required"}
          error={errors}
          required={true}
          placeHolder="Price"
          className="w-full"
          />

          <InputField
          label="Discount"
          id="discount"
          type="number"
          register={register}
          message={"*This field is required"}
          error={errors}
          required={true}
          placeHolder="Discount"
          className="w-full"
          />
        </div>


        <div className='ml-3 flex md:flex-row flex-col gap-4 w-full'>
          <InputField
          label="Quantity"
          id="quantity"
          type="number"
          register={register}
          message={"*This field is required"}
          error={errors}
          required={true}
          placeHolder="Quantity"
          className="w-full"
          />

          <InputField
          label="Special Price"
          id="specialPrice"
          type="number"
          register={register}
          message={"*This field is required"}
          error={errors}
          required={true}
          placeHolder="Special Price"
          className="w-full"
          />
        </div>

          <div className='ml-3 flex md:flex-col flex-col gap-4 w-full'>
            <label htmlFor='description' className='font-semibold text-sm text-slate-800'>
              Description
            </label>
            <textarea 
                rows={5}
                placeholder="Add Product Description"
                id="description"
                className={`px-4 py-2 border outline-none bg-transparent text-slate-800 rounded:md ${errors["description"]?.message ? "border-red-500":"border-slate-700 focus:border-slate-600"} `}
                {...register("description",{
                  required:{
                        value:true,
                        message:"Description is required"
                    },
                }
            )}/>
            {errors && errors["description"]?.message && (
            <p className='text-red-500 text-sm mt-1'>*{errors["description"]?.message}</p>
            )}
          </div>

          {
            !product && (
              <div className='ml-3 flex md:flex-col flex-col gap-4 w-full'>
                <label htmlFor='category' className='font-semibold text-sm text-slate-800'>
                  Category
                </label>
                <select
                    id="category"
                    value={categoryId}
                    onChange={(e)=>setCategoryId(e.target.value)}
                    className={`px-4 py-2 border outline-none bg-transparent text-slate-800 rounded:md ${errors["category"]?.message ? "border-red-500":"border-slate-700 focus:border-slate-600"} `}
                >
                    <option value="">Select Category</option>
                    {
                      categories && categories.map((category)=>(
                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                      ))
                    }
                </select>
                {errors && errors["category"]?.message && (
                <p className='text-red-500 text-sm mt-1'>*{errors["category"]?.message}</p>
                )}
              </div>
            )
          }


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
                            <FaSpinner className='animate-spin' > Updating...</FaSpinner>
                        )
                      
                      : 'Update Product'}
            </Button>
        </div>
      </form>
    </div>

  )
}

export default ProductUpdateForm