import React from 'react'
import { FaEnvelope, FaMapMarkedAlt, FaPhone, FaPhoneAlt } from 'react-icons/fa'

const Contact = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-12 bg-cover bg-center bg-gray-100'
    >

        <div className='bg-white shadow-lg rounded-lg p-8 w-full max-w-lg'>
            <h1 className='text-4xl font-bold text-center mb-6'>Contact Us</h1>
            <p className='text-gray-700 text-center mb-4'>
                We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
            </p>
            <form className='space-y-4 '>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Name
                    </label>
                    <input type="text" 
                    required
                    className='mt-1  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                    />
                </div>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Email
                    </label>
                    <input type="email" 
                    required
                    className='mt-1  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                    />
                </div>

                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Message
                    </label>
                    <textarea
                    rows={4}
                    required
                    className='mt-1  block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2'
                    />
                </div>

                <button
                className='w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-300'
                >
                    Send Message
                </button>
            </form>


            <div className='mt-8 text-center'>
                <h2 className='text-lg font-semibold'>Contact Information</h2>
                <div className='flex flex-col items-center space-y-2 mt-4'>
                    <div className='flex items-center space-x-2'>
                        <FaPhoneAlt className='text-blue-500'/>
                        <span className='text-gray-700'>+91 4894567832</span>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <FaEnvelope className='text-blue-500'/>
                        <span className='text-gray-700'>vedantamsaikartheek@gmail.com</span>
                    </div>

                    <div className='flex items-center space-x-2'>
                        <FaMapMarkedAlt className='text-blue-500'/>
                        <span className='text-gray-700'>Andhra Pradesh</span>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default Contact