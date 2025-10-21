import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Divider } from "@mui/material";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdminCategory } from "../../../store/actions/adminActions";

export default function DeleteCategoryForm({
  open,
  setOpen,
  selectedCategory,
}) {
  const dispatch=useDispatch();
  const {isLoading}=useSelector((state)=>state.errors)
  const deleteCategoryHandler=()=>{
    dispatch(deleteAdminCategory(selectedCategory,setOpen,toast))
  }
  return (
    <>
      <Dialog open={open} as="div" className="relative z-10" onClose={() => setOpen(false)}>
        <DialogBackdrop className="fixed inset-0 bg-gray-100 opacity-75 transition-opacity" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
          <div className="flex min-h-screen items-center justify-center py-12 px-4">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all md:max-w-[500px] md:min-w-[450px] w-full my-8"
            >
              <div className="px-8 py-8">
                <DialogTitle
                  as="h3"
                  className="text-xl font-semibold leading-6 text-gray-800 mb-8 text-center"
                >
                 Are you sure want to delete the Category {selectedCategory.categoryName} ?
                </DialogTitle>
                <div className="flex justify-between gap-4">
                  <button 
                        onClick={()=> setOpen(false)}
                        type='button'
                        className="px-6 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer flex-1"
                    >
                        Close

                    </button>
                    <button 
                        onClick={deleteCategoryHandler}
                        type='button'
                        className="px-6 py-3 text-base font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md cursor-pointer flex-1"
                    >
                        {isLoading? "Deleting...":"Delete"}
                    </button>
                </div>
                    
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
