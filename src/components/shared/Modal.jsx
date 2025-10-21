import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
function Modal({open,setOpen,children,title=""}) {
  
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-closed:opacity-0" />
        <div className="fixed inset-0 overflow-hidden">
            <div className='absolute inset-0 overflow-hidden'>
                <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
                    <DialogPanel transition
                    className="pointer-events-auto relative transform transition duriation-500 ease-in-out data-closed:translate-x-full sm:duration-700 w-screen max-w-2xl sm:max-w-3xl">
                    <div className='flex h-full flex-col overflow-y-scroll bg-white shadow-xl'>
                        <div className='px-4 sm:px-6'>
                            <DialogTitle className="font-bold text-2xl py-4 border-b">
                                Panel Title
                            </DialogTitle>
                        </div>
                        <div>
                            <div className='relative mt-6 flex-1 px-4 sm:px-6'> 
                                <h1 className='font-montserrat font-bold text-slate-800 text-2xl pt-4'>{title}</h1>
                                <button className='absolute top-4 right-4 text-gray-600 hover:text-gray-900' onClick={()=>setOpen(false)}>
                                    <RxCross1/>
                                </button>
                            </div>
                            {children}
                        </div>
                    </div>
                    </DialogPanel>
                </div>
            </div>
        </div>
      </Dialog>
    </>
  )
}
export default Modal