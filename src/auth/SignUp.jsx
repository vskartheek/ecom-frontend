import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/shared/InputField';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { authenticatedSignInUser, signUpUser } from '../store/actions';
import { FaRegistered, FaUserPlus } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
const SignUp = () => {
    const navigate = useNavigate();
    const [loader,setLoader]=useState(false);
    const dispatch=useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        } = useForm({
            mode:"onTouched",
        });
    
        const registerHandler=async (data)=>{
            dispatch(signUpUser(data,toast,reset,navigate,setLoader))
        }

  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center'>
        <form action=""
        onSubmit={handleSubmit(registerHandler)}
        className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'
        >
            <div className='flex flex-col items-center justify-center'>
                <FaUserPlus size={25} className='text-slate-800 text-5xl'/>
                <h1 className='text-slate-800 text-center font-montserrat lg:text-3xl text-2xl font-bold'>Create Your Account</h1>
            </div>
        <hr className='mt-2  mb-5 text-black'/>
        <div className=' flex flex-col gap-3'>
            <InputField
            label="UserName"
            required
            id="username"
            type="text"
            register={register}
            error={errors}
            message="*Username is required"
            placeHolder="Enter your username"
            />

            <InputField
            label="Email"
            required
            id="email"
            type="email"
            register={register}
            error={errors}
            message="*Email is required"
            placeHolder="Enter your email id"
            />
        
            <InputField
            label="Password"
            required
            id="password"
            type="password"
            register={register}
            error={errors}
            message="*Password is required"
            placeHolder="Enter your password"
            min={6}
            />
            <button
            type="submit"
            disabled={loader}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50"
            >
            {loader ? 
           <div className='flex justify-center items-center gap-2'>
            <ClipLoader size={20} color='white'/> Signing Up....
            </div>
            
            :
             "Sign Up"
            }
            </button>
        </div>
        <p className='text-center text-sm text-slate-700 mt-6'> Already Registered ?
        <Link
        className='font-semibold underline hover:text-black'
        to="/login"
        > <span>Login</span>
        </Link>
        </p>
        </form>
    </div>
  )
}

export default SignUp