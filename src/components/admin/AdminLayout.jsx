import React from 'react'
import Sidebar from '../shared/Sidebar'
import { Outlet } from 'react-router-dom';
import { Description, Dialog, DialogBackdrop, DialogPanel, TransitionChild } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import { FaBars } from 'react-icons/fa';

const AdminLayout = () => {
  const [sideBarOpen,setSideBarOpen]=React.useState(false);
  return (
   <div>
  <Dialog open={sideBarOpen} onClose={() => setSideBarOpen(false)} 
  
  className="relative z-50 xl:hidden">
    <DialogBackdrop 
    transition
    className="fixed insert-0 bg-gray-900/80 transition-opacity duration-300 ease-linear"/>
    <div className="fixed inset-0 flex ">
      <DialogPanel 
      transition
      className="relative mr-16 flex w-full max-w-xs flex-1 transform transition flex-col bg-white  pb-4 shadow-xl duration-300 ease-in-out data-closed:-translate-x-full">           
      <TransitionChild>
      <div className='absolute left-full top-0 flex w-16 flex-row justify-center pt-5 duration-300 ease-in-out '>
        <button type='button'
          onClick={()=>setSideBarOpen(false)}
          className='ml-1 mt-1 rounded-md p-2 text-gray-700'
        >
          <RxCross2 className='h-6 w-6 text-white bg-gray-600'/>
        </button>
      </div>
       </TransitionChild>
       <Sidebar/>
      </DialogPanel>
    </div>
    </Dialog>
    
  <div className='hidden xl:fixed xl:flex xl:inset-y-0 xl:z-50 xl:max-w-72 xl:flex-col'>
    <Sidebar/>
  </div>
  
  <div className='xl:pl-52'>
    <button
      type='button'
      className='m-4 inline-flex items-center rounded-lg bg-white p-2 text-gray-700 shadow-lg xl:hidden'
      onClick={()=>setSideBarOpen(true)}
    >
      <span className='sr-only'>Open sidebar</span>
      <FaBars className='h-6 w-6'/>
    </button>
    <main >
      <div>
      <Outlet className='p-4 sm:p-6 xl:p-8'/>
      </div>
    </main>
  </div>
   </div>
  )
}

export default AdminLayout