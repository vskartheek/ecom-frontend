import React from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductImage } from '../../../store/actions/adminActions';

const ProductImageUpdateForm = ({
  setOpen,
  product,
}) => {

  const imageSubmitHandler=async (e)=>{
    e.preventDefault();
    if(!selectedImage){
      toast.error("Please select an image");
      return;
    }
    const formData=new FormData();
    formData.append('image',selectedImage);    
    dispatch(updateProductImage(product.id,formData,toast,setOpen))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
      console.log(file);
    }else{
      toast.error("No file selected / File not supported");
      setPreview(null);
      setSelectedImage(null);
    }
  }
  const fileInputRef = React.useRef(null);
  const [preview,setPreview]=React.useState(null);
  const {isLoading}=useSelector((state)=>state.errors)
  const [selectedImage,setSelectedImage]=React.useState(null);
  const dispatch=useDispatch();
  return (
    <div className="p-6">      
      {/* Display current image */}
      <div className="mb-6">
        <label className="block text-lg font-semibold text-gray-800 mb-4">
          Current Image:
        </label>
        {product?.image ? (
          <div className="flex justify-center">
            <img 
              src={product.image} 
              alt={product.productName || 'Product'} 
              className="w-80 h-60 object-cover rounded-lg border-2 border-gray-200 shadow-md"
            />
          </div>
        ) : (
          <div className="w-full h-60 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-600">No image available</span>
            </div>
          </div>
        )}
      </div>

      {/* File input for new image */}
      <form className="space-y-6" onSubmit={imageSubmitHandler}>
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Select New Image:
          </label>
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              accept="images/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </div>

        {
          preview && (
            <div className="mt-4">
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                Image Preview:
              </label>
              <div className="flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-80 h-60 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                />
              </div>
            </div>
          )
        }
        
        <div className="flex justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-6 py-3 text-base font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 text-base font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
          >
            Update Image
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductImageUpdateForm