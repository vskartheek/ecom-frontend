import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {FaBuilding, FaCheckCircle, FaEdit, FaStreetView} from 'react-icons/fa'
import { MdDelete, MdFlag, MdLocationCity, MdPin } from 'react-icons/md'
import { set } from 'react-hook-form'
import { deleteAddress, selectAddress } from '../../../store/actions'
import toast from 'react-hot-toast'
import DeleteConfirmation from './DeleteConfirmation'

const AddressList = ({
    addresses,
    setSelectedAddress,
    setOpenModal
}) => {
  const dispatch=useDispatch()
  const {selectedAddress}=useSelector((state)=>state.auth)
  const handleAddressSelection=(address)=>{
    dispatch(selectAddress(address))
  }
  const onEditButtonHandler=(address)=>{
    setSelectedAddress(address)
    setOpenModal(true)
  }
  const [deleteConfirmation,setDeleteConfirmation]=React.useState(false);
  const onDeleteButtonHandler=(address)=>{
    dispatch(deleteAddress(address?.addressId,toast))
  }

 
  return (
    <div className='space-y-4'>
        {addresses?.map((address)=>{
        return    <div key={address.addressId}
            onClick={()=>handleAddressSelection(address)}
            className={`p-4 border rounded-md cursor-pointer relative ${
                selectedAddress?.addressId===address.addressId ? "bg-green-200": "border-slate-300 hover:border-slate-500"
            }`}
            >
                <div className='flex items-start'>
                    <div className='space-y-1'>
                        <div className='flex items-center'>
                            <FaBuilding size={14} className='mr-2 text-gray'/> 
                            <p className='font-semibold '>{address.buildingName}</p>
                            {selectedAddress?.addressId===address.addressId && (
                                <FaCheckCircle className='text-green-600 ml-2' size={16}/>
                            )}
                        </div>

                        <div className='flex items-center'>
                            <FaStreetView size={17} className='mr-2 text-gray'/> 
                            <p>{address.street}</p>
                        </div>

                        <div className='flex items-center'>
                            <MdLocationCity size={17} className='mr-2 text-gray'/> 
                            <p>{address.city}, {address.state}</p>
                        </div>

                        <div className='flex items-center'>
                            <MdFlag size={17} className='mr-2 text-gray'/> 
                            <p>{address.country}</p>
                        </div>

                        <div className='flex items-center'>
                            <MdPin size={17} className='mr-2 text-gray'/> 
                            <p>{address.pincode}</p>
                        </div>
                    </div>
                </div>
            
                <div className='flex gap-3 absolute top-4 right-2'>
                    <button onClick={()=>setSelectedAddress(address)}>
                            <FaEdit size={18} className='text-blue-600 cursor-pointer'/>
                    </button>
                    <button onClick={()=>setDeleteConfirmation(true)}>
                            <MdDelete size={18} className='text-red-600 cursor-pointer'/>
                    </button>
                </div>
            </div>

            }
        )
    }
    {deleteConfirmation && (
        <DeleteConfirmation setDeleteConfirmation={setDeleteConfirmation} deleteHandler={onDeleteButtonHandler} address={selectedAddress}/>
    )}
    </div>
  )
}

export default AddressList