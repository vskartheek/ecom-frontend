import React, { useEffect } from 'react'
import Skeleton from '../../shared/Skeleton';
import NoAddressExist from './NoAddressExist';
import { Button} from '@mui/material';
import { MdAdd } from 'react-icons/md';
import AddressInfoModal from './AddressInfoModal';
import AddAddressForm from './AddAddressForm';
import { useDispatch, useSelector } from 'react-redux';
import AddressList from './AddressList';
import { selectAddress } from '../../../store/actions';
import ErrorMessage from '../../shared/ErrorMessage';
const AddressInfo = ({addresses}) => {

    const noAddressExist=addresses?.length===0;
    const {isLoading,btnLoader}=useSelector((state)=>state.errors)
    const [openModal,setOpenModal]=React.useState(false);
    const [selectedAddress,setSelectedAddress]=React.useState(null);
    const {errorMessage}=useSelector((state)=>state.errors)
    const dispatch=useDispatch()
    
    const onAddAddress=()=>{
      setSelectedAddress(null);
      setOpenModal(true);
    }

    if(errorMessage){
      return (
        <ErrorMessage errorMessage={errorMessage}/>
      )
    }
  return (
    <div className='pt-4'>
        {noAddressExist ? (
          <div className='flex items-center justify-center flex-col'>
                <NoAddressExist />
                <Button 
                variant="contained"
                color="primary"
                onClick={onAddAddress}
                startIcon={<MdAdd />}
                size="large"
            >
                Add New Address
            </Button>
            </div>
        ):(
            <div className='relative p-6 rounded-lg max-w-md mx-auto'>
                  <h1 className='text-slate-800 text-center font-bold text-2xl'>
                    Select Address
                  </h1>
                {isLoading?(
                  <div className='py-4 px-8'>
                    <Skeleton/>
                  </div>
                    
                ):(
                    <div className='space-y-4 pt-6'>
                      <AddressList
                        addresses={addresses}
                        setSelectedAddress={setSelectedAddress}
                        setOpenModal={setOpenModal} 
                      />
                      <Button 
                          variant="contained"
                          color="primary"
                          onClick={onAddAddress}
                          startIcon={<MdAdd />}
                          size="large"
                      >
                          Add New Address
                      </Button>
                    </div>
                )}
                
            </div>
        )}
      <AddressInfoModal open={openModal} setOpen={setOpenModal} scrolled={true}>
        <AddAddressForm setOpen={setOpenModal} address={selectedAddress} />
      </AddressInfoModal>
  </div>
  )
}
export default AddressInfo