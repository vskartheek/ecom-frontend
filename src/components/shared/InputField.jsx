import React from 'react'

const InputField = ({
    label,
    id,
    type,
    error = {},
    register,
    message,
    className,
    min,
    value,
    placeHolder,
    required = false,
    visible
}) => {
  return (
    <div className='flex flex-col gap-1 w-full'>
        <label
        htmlFor={id}
        className={`${
            className ? className:""
        } font font-semibold text-sm text-slate-800`}
        >
        {label}
        </label>
        <input 
        type={type}
        placeholder={placeHolder}
        id={id}
        value={value}
        contentEditable={visible}
        className={`${
            className?className:""
        } px-2 py-2 border outline-none bg-transparent text-slate-800 rounded:md ${error && error[id]?.message ? "border-red-500":"border-slate-700 focus:border-slate-600"} `}
        {...register(id,{
            required:{
                value:required,
                message
            },
            minLength:min
            ?{
                value:min,
                message:`Minimum ${min} characters required`
            }:null,
            pattern:
            type==="email"
            ?{
                value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message:"Invalid email address"
            }: type ==="url"
            ?{
                value:/^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-._~:/?#\[\]@!$&'()*+,;=]*)?$/,
                message:"Invalid url"
            }
            :null
        }
    )}/>
        {error && error[id]?.message && (
            <p className='text-red-500 text-sm mt-1'>{error[id]?.message}</p>
        )}
    </div>
  )
}

export default InputField