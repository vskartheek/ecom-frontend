import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import React from 'react'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { updateOrderStatus } from '../../../store/actions/adminActions'

const OrderStatusUpdateForm = ({setOpen,orderId,selectedItem,loader,setLoader}) => {

    const orderStatuses = ["Order Accepted","Pending", "Shipped", "Delivered", "Cancelled"];
    const [status, setStatus] = React.useState(selectedItem?.orderStatus || "PENDING");
    const [error, setError] = React.useState("");
    const dispatch=useDispatch();
    const handleOrderUpdate=(e)=>{
        e.preventDefault();
        dispatch(updateOrderStatus(orderId,setLoader,setError,status,setOpen,toast))
    }
return (
    <div className='py-4 relative h-full'>
            <form className='space-y-4 ml-4 mt-4' action=""
            onSubmit={handleOrderUpdate}
            >
                    <FormControl fullWidth  variant='outlined' error={Boolean(error)}>
                            <InputLabel>Order Status</InputLabel>
                            <Select
                                    labelId="order-status-label"
                                    label="Order Status"
                                    value={status}
                                    onChange={(e) => {
                                            setStatus(e.target.value);
                                            setError("");
                                    }}
                            >
                                    {orderStatuses.map((status) => (
                                            <MenuItem key={status} value={status}
                                            >
                                                    {status}
                                            </MenuItem>
                                    ))}
                            </Select>
                            {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                    <div className='absolute bottom-4 left-0 right-0 flex justify-between px-4'>
                            <Button 
                                    disabled={loader}
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
                                    disabled={loader}
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
                                     {loader ? 
                                        (
                                            <FaSpinner className='animate-spin' > Updating...</FaSpinner>
                                        )
                                     
                                     : 'Update Status'}
                            </Button>
                    </div>
            </form>
    </div>
)
}

export default OrderStatusUpdateForm