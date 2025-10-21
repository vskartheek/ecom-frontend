import { MenuItem,Menu, Button, Avatar,  } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signOutUser } from '../store/actions';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaSignOutAlt, FaUser, FaUserAstronaut } from 'react-icons/fa';
import BackDrop from './BackDrop';

const UserMenu = ({username}) => {

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const navigate=useNavigate();
const dispatch=useDispatch();
const {user}=useSelector((state)=>state.auth)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);

  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout=()=>{
    dispatch(signOutUser(toast,navigate))
  }

  return (
    <div className='relative z-30'>
      <div
        className='cursor-pointer sm:border-[1px] sm:border-slate-400 flex flex-row items-center gap-1 rounded-full hover:shadow-md transition text-slate-700'
        onClick={handleClick}
      >
        <Avatar>{username.slice(0,2)}</Avatar>
      </div>
      <Menu
      sx={{
        width:"400px"
      }}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
            sx:{width:160}
          },
        }}
      >
        <Link to="/profile">
        <MenuItem className="flex gap-2" 
        onClick={handleClose}>
           <FaUser className='text-xl'/> 
           <span className='font-bold text-[16px] mt-1'>
            {username}
           </span>
        </MenuItem>
        </Link>
          {user?.roles?.includes("ROLE_ADMIN") &&
              <Link to="/admin">
                <MenuItem onClick={handleClose}
                className="flex gap-2"
                >
                  <FaUserAstronaut className='text-xl'/> 
                  <span className='text-[16px] mt-1'>
                    Admin Panel
                </span>
                </MenuItem>
              </Link>
          }
          
        <Link to="/orders">
          <MenuItem onClick={handleClose}
          className="flex gap-2"
          >
            <FaShoppingCart className='text-xl'/> 
            <span className='text-[16px] mt-1'>
              Orders
           </span>
          </MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}
          className="flex gap-2"
          >
            <FaSignOutAlt className='text-xl'/> 
            <span className='text-[16px] mt-1'>
              Logout
           </span>
          </MenuItem>
      </Menu>
      {open && <BackDrop/>}
    </div>
  );
}

export default UserMenu