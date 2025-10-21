import React from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useSelector } from 'react-redux';
import CustomLoader from '../../shared/CustomLoader';
import { adminProductsTableColumns } from '../../helper/tableColumn';
import { DataGrid } from '@mui/x-data-grid';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { set } from 'react-hook-form';
import OrderStatusUpdateForm from '../orders/OrderStatusUpdateForm';
import ProductUpdateForm from './ProductUpdateForm';
import ProductDeleteForm from './ProductDeleteForm';
import ProductView from './ProductView';
import ProductImageUpdateForm from './ProductImageUpdateForm';
import useAdminProductsFilter from '../../../hooks/useAdminProductsFilter';
import Modal from '../../shared/Modal';


const AdminProducts = () => {
  const {products,pagination}=useSelector((state)=>state.products);
  const {isLoading,errorMessage}=useSelector((state)=>state.errors);
  useAdminProductsFilter();
  const rows = 
  products?.map((product)=>({
    id:product.productId,
    productName:product.productName,
    description:product.description,
    price:product.price,
    quantity:product.quantity,
    discount:product.discount,
    specialPrice:product.specialPrice,
    image:product.image,
  }))


  const [currentPage,setCurrentPage]=React.useState(
      pagination?.pageNumber+1 ||1
    );
  
    const [searchParams]=useSearchParams()
    const params=new URLSearchParams(searchParams);
    const pathName=useLocation().pathname;
    const navigate=useNavigate();
    const [updatedOpenModal,setUpdatedOpenModal]=React.useState(false);
    const [createOpenModal,setCreateOpenModal]=React.useState(false);
    const [deleteOpenModal,setDeleteOpenModal]=React.useState(false);
    const [imageUpdateOpenModal,setImageUpdateOpenModal]=React.useState(false);
    const [viewOpenModal,setViewOpenModal]=React.useState(false);
    const [selectedProduct,setSelectedProduct]=React.useState(null);
    const [loader,setLoader]=React.useState(false);
  
    const handlePaginationChange=(paginationModel)=>{
      const page=paginationModel.page+1;
      setCurrentPage(page);
      params.set('page',page.toString());
      navigate(`${pathName}?${params}`)
    }


  const handleEdit=(rowData)=>{
    // Find the complete order data from adminOrders using the orderId
    setSelectedProduct( rowData);
    setUpdatedOpenModal(true);
    setCreateOpenModal(true);
  }
  const handleDelete=(rowData)=>{
    setSelectedProduct(rowData);
    setDeleteOpenModal(true);

  }
  const handleImageUpdate=(rowData)=>{
    setSelectedProduct(rowData);
    setImageUpdateOpenModal(true);
  }
  const handleView=(rowData)=>{
    setSelectedProduct(rowData);
    setViewOpenModal(true);
  }

  const handleAddProduct=()=>{
    setSelectedProduct(null)
    setUpdatedOpenModal(true)
    setCreateOpenModal(false);
  }


  const emptyProducts=!products || products?.length===0;

  return (
    <div>
      <div className='pt-6 pb-10 px-4 flex justify-end max-w-7xl mx-auto'>
        <button onClick={handleAddProduct} className='inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
          <MdAddShoppingCart className='text-xl'/>
          Add Product
        </button>
      </div>   
      {
        !emptyProducts &&(
          <h1 className='text-slate-800 text-3xl text-center font-bold pb-6 uppercase'>All Products</h1>
        )
      }
      {isLoading ? (
        <CustomLoader/>
      ):(
        <>
        {
          emptyProducts ?(
            <div className='flex flex-col items-center justify-center min-h-[400px] text-center'>
              <div className='bg-gray-100 rounded-full p-6 mb-6'>
                <svg className='w-16 h-16 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
                </svg>
              </div>
              <h2 className='text-3xl font-bold text-gray-800 mb-4'>No Products Yet</h2>
              <p className='text-lg text-gray-600 mb-2'>You haven't added any products yet</p>
              <p className='text-gray-500 max-w-md'>When you add products, they will appear here for you to manage and edit.</p>
              <div className='mt-8 flex items-center space-x-2 text-blue-600'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-sm'>Products will automatically sync when added</span>
              </div>
            </div>
          ):(
            <div className='max-w-full '>
                     <DataGrid
                        paginationMode='server'
                        rowCount={pagination.totalElements ||0}
                        className='mt-6 w-full '
                        rowHeight={60}
                        rows={rows}
                        columns={adminProductsTableColumns({handleEdit,handleDelete,handleImageUpdate,handleView})}
                        initialState={{
                          pagination: {
                            paginationModel: {
                              pageSize: pagination?.pageSize||5,
                              page: currentPage-1,
                            },
                          },
                        }}
                        onPaginationModelChange={handlePaginationChange}
                        disableRowSelectionOnClick
                        disableColumnResize
                        pageSizeOptions={[pagination?.pageSize ||10]}
                        pagination
                        paginationOptions={{
                          showFirstButton: true,
                          showLastButton: true,
                          hideNextButton:currentPage===pagination?.totalPages,
                        }}   
                    />
            </div>
          )
        }
        </>
      )}
      <Modal
        open={updatedOpenModal}
        setOpen={setUpdatedOpenModal}
        title="Update Product"
      >
        <ProductUpdateForm
          setOpen={setUpdatedOpenModal}
          product={selectedProduct}
          update={createOpenModal}
        />
      </Modal>

     {
      viewOpenModal &&
      <ProductView
        open={viewOpenModal}
        setOpen={setViewOpenModal}
        product={selectedProduct}
      />
    }
      {
        deleteOpenModal &&
        <ProductDeleteForm
        open={deleteOpenModal}
        setOpen={setDeleteOpenModal}
        product={selectedProduct}
      />}

        <Modal
        open={imageUpdateOpenModal}
        setOpen={setImageUpdateOpenModal}
        title="Update Product Image"
      >
          <ProductImageUpdateForm
            setOpen={setImageUpdateOpenModal}
            product={selectedProduct}
          />
      </Modal>
      
    </div>
  )
}

export default AdminProducts