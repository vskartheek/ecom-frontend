import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import React from 'react'
import { MdClose } from 'react-icons/md';
const AddressInfoModal = ({open,setOpen,children}) => {
  return (
    <div >
        <Dialog open={open} onClose={() => setOpen(true)}>
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="relative w-full max-w-md max-auto transform overflow-hidden bg-white rounded-lg shadow-xl transition-all max-h-[80vh] overflow-y-auto">
            <div className='px-4 py-4'>
                {children}
            </div>
            <div className='flex justify-end gap-4 absolute top-4 right-4'>
                <button onClick={() => setOpen(false)} >
                    <MdClose className='text-slate-700' size={25}/>
                </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}

export default AddressInfoModal