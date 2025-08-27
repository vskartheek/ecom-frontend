import { Badge } from '@mui/material';
import React from 'react'
import { FaCross, FaShoppingCart, FaSignInAlt, FaStore } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { IoMdMenu } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { useSelector } from 'react-redux';
const Navbar = () => {
    const path=useLocation().pathname;
    const[navBarOpen,setNavBarOpen]=React.useState(false);
    const {cart}=useSelector((state)=>state.carts)

  return (
    <div className='h-[70px] bg-custom-gradient text-white z-50 flex items-center sticky top-0'>
        <div className="lg:px-14 sm:px-8 w-full flex justify-between">
            <Link to="/" className="flex items-center text-2xl font-bold">
                <FaStore/>
                <span className='font-[Poppins] px-2'>E-shop</span>
            </Link>

            <ul className={`flex sm:gap-10 gap-4 sm:items-center text-slate-800 sm:static absolute left-0 top-[70px]
                sm:shadow-none shadow-md ${
                    navBarOpen?"h-fit sm:pb-0 pb-5":"h-0 overflow-hidden"
                } transition-all duration-100 sm:h-fit sm:bg-none bg-custom-gradient text-white sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0
                `}>
                <li className='font-[500] transition-all duration-150'>
                    <Link to="/" className={`${
                        path==="/"?"text-white font-semibold":"text-gray-300 hover:text-white"
                    }`}>
                        Home
                    </Link>
                </li>

                <li className='font-[500] transition-all duration-150'>
                    <Link to="/products" className={`${
                        path==="/products"?"text-white font-semibold":"text-gray-300 hover:text-white"
                    }`}>
                        Products
                    </Link>
                </li>

                <li className='font-[500] transition-all duration-150'>
                    <Link to="/about" className={`${
                        path==="/about"?"text-white font-semibold":"text-gray-300 hover:text-white"
                    }`}>
                        About
                    </Link>
                </li>

                <li className='font-[500] transition-all duration-150'>
                    <Link to="/contact" className={`${
                        path==="/contact"?"text-white font-semibold":"text-gray-300 hover:text-white"
                    }`}>
                        Contact
                    </Link>
                </li>

                <li className='font-[500] transition-all duration-150'>
                    <Link to="/cart" className={`${
                        path==="/cart"?"text-white font-semibold":"text-gray-300 hover:text-white"
                    }`}>
                        <Badge
                        showZero
                        badgeContent={cart?.length}
                        color='primary'
                        overlap='circular'
                        anchorOrigin={
                            { vertical: 'top', horizontal: 'right' }
                        }
                        >
                        <FaShoppingCart size={25}/>
                        </Badge>
                    </Link>
                </li>

                <li className='font-[500] transition-all duration-150'>
                    <Link to="/login" 
                    className="flex items-center space-x-2 px-4 py-[6px]
                            bg-gradient-to-r from-purple-600 to-red-600
                            text-white font-semibold rounded-md shadow-lg
                            hover:from-purple-500 hover:to-red-400
                            transition duriation-300 ease-in-out transform
                    "
                    
                    >
                        <FaSignInAlt/>
                        <span>Login</span>
                    </Link>
                </li>
                
            </ul>
            <button onClick={()=>setNavBarOpen(!navBarOpen)}
                    className='sm:hidden flex items-center sm:mt-0 mt-2'
                    >
                        {
                            navBarOpen?(
                                <RxCross2 className='text-white text-3xl'/>
                            ):(
                                <IoMdMenu className='text-white text-3xl'/>
                            )
                        }
                </button>
        </div>
    </div>
  )
}

export default Navbar