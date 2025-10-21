import React from 'react'
import { useSelector } from 'react-redux';

const DeleteConfirmation = ({
    setDeleteConfirmation,
    deleteHandler,
    address
}) => {
    const {btnLoading}=useSelector((state)=>state.auth)
  return (
   <div>
        <div className='fixed inset-0 bg-gray bg-opacity-70 backdrop-blur flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded shadow-md w-96'>
                <h2 className='text-xl font-semibold mb-4'>Confirm Deletion</h2>
                <p className='mb-4'>Are you sure you want to delete the address at <span className='font-bold'>{address?.buildingName}, {address?.street}, {address?.city}</span>?</p>
                <div className='flex justify-end space-x-4'>
                    <button
                        onClick={() => setDeleteConfirmation(false)}
                        className='px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            deleteHandler(address);
                            setDeleteConfirmation(false);
                        }}
                        className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
                    >
                        {btnLoading ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>
        </div>
   </div>
  )
}

export default DeleteConfirmation