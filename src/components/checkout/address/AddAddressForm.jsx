import React, { use, useEffect } from 'react'
import InputField from '../../shared/InputField'
import { useForm } from 'react-hook-form';
import { FiMapPin } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addUpdateUserAddress, fetchUserAddresses } from '../../../store/actions';
import { useNavigate } from 'react-router-dom';

const AddAddressForm = ({setOpen,address}) => {
    const {btnLoader}=useSelector((state)=>state.errors)
    const dispatch=useDispatch()
    const {user}=useSelector((state)=>state.auth)
    console.log(address)
    const navigate=useNavigate();
    const {
            register,
            handleSubmit,
            reset,
            setValue,
            formState: { errors },
            } = useForm({
                mode:"onTouched",
            });
    const addAddressHandler=async (data)=>{
        if(!user){
            toast.error("Please login/create account to proceed!")
            navigate("/login")
            return;
        }
        dispatch(addUpdateUserAddress(data,toast,address?.addressId ,reset,setOpen))

    }

    useEffect(()=>{
        if(address?.addressId){
            setValue("street",address?.street)
            setValue("buildingName",address?.buildingName)
            setValue("city",address?.city)
            setValue("state",address?.state)
            setValue("country",address?.country)
            setValue("pincode",address?.pincode)
        }
    },[address])
  return (
    <div className='font-semibold font-size-3 text-slate-800'>
    <form
        onSubmit={handleSubmit(addAddressHandler)}
        className='space-y-4'
        >
            <div className='flex justify-center items-center gap-2 mb-4'>
                <FiMapPin size={25} className='text-slate-800'/>
                <span>{!address?.addressId? "Add new Address":"Update Address"}</span>
            </div>
        <div className='space-y-3'>
            <InputField
            label="Street"
            required
            id="street"
            type="text"
            register={register}
            error={errors}
            message="*street name is required"
            placeHolder="Enter your Street Name"
            min={2}
            />

            <InputField
            label="Building Name"
            required
            id="buildingName"
            type="text"
            register={register}
            error={errors}
            message="Building Name is required"
            placeHolder="Enter your Building Name"
            min={5}
            />

            <InputField
            label="City"
            required
            id="city"
            type="text"
            register={register}
            error={errors}
            message="city is required"
            placeHolder="Enter your City Name"
            min={4}
            />

            <InputField
            label="State"
            required
            id="state"
            type="text"
            register={register}
            error={errors}
            message="state is required"
            placeHolder="Enter your State Name"
            min={2}
            />

            <InputField
            label="Country"
            required
            id="country"
            type="text"
            register={register}
            error={errors}
            message="country is required"
            placeHolder="Enter your Country Name"
            min={2}
            />

            <InputField
            label="Pin Code"
            required
            id="pincode"
            type="text"
            register={register}
            error={errors}
            message="pin Code is required"
            placeHolder="Enter your Pin Code"
            min={6}
            />
            
            <button
            disabled={btnLoader}
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md mt-2 transition-colors duration-200 disabled:opacity-50"
            >
                {address?.addressId ? (btnLoader ? "Updating Address..." : "Update Address") : (btnLoader ? "Adding Address..." : "Add Address")}
            </button>
        </div>
        </form>
    </div>
  )
}

export default AddAddressForm