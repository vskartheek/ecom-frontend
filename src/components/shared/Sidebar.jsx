import React from 'react'
import { FaTachometerAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom'
import { adminNavigation } from '../../utils';
import classNames from 'classnames';

const Sidebar = ({isProfileLayout=false}) => {
  const pathName=useLocation().pathname;
  const {user}=useSelector((state)=>state.auth)
  const sideBarLayout=adminNavigation;
    return (
    <div className='flex grow flex-col gap-y-7 overflow-y-auto bg-custom-gradient px-6 pb-4 '>
        <div className='flex h-16 shrink-0 gap-x-3 pt-2'>
            <FaTachometerAlt className='h-8 w-8 text-indigo-600'/>
            <span className='text-2xl font-bold text-white'>Admin</span>
        </div>
        <nav className='flex flex-1 flex-col'>
            <ul role='list' className='flex flex-1 flex-col gap-y-7'>
                <li>
                    <ul role='list' className='-mx-2 space-y-4'>
                        {sideBarLayout.map((item)=>(
                            <li key={item.name}>
                                <Link
                                to={item.href}
                                className={classNames(
                                    pathName===item.href
                                    ?'bg-indigo-700 text-white'
                                    :'text-gray-300 hover:text-white hover:bg-indigo-500',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                >
                                    <item.icon className='h-6 w-6 shrink-0'/>
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Sidebar