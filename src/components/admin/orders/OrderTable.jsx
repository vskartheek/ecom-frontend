import { minWidth } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid'
import { adminOrderTableColumns } from '../../helper/tableColumn';
import React from 'react'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Modal from '../../shared/Modal';
import { set } from 'react-hook-form';
import OrderStatusUpdateForm from './OrderStatusUpdateForm';
const OrderTable = ({adminOrders,pagination}) => {
  const rows = 
  adminOrders.map((order)=>({
    id:order.orderId,
    email:order.email,
    totalAmount:order.totalAmount,
    orderDate:order.orderDate,
    orderStatus:order.orderStatus,

  }))
  const [currentPage,setCurrentPage]=React.useState(
    pagination?.pageNumber+1 ||1
  );

  const [searchParams]=useSearchParams()
  const params=new URLSearchParams(searchParams);
  const pathName=useLocation().pathname;
  const navigate=useNavigate();
  const [updatedOpenModal,setUpdatedOpenModal]=React.useState(false);
  const [selectedOrder,setSelectedOrder]=React.useState(null);
  const [loader,setLoader]=React.useState(false);

  const handlePaginationChange=(paginationModel)=>{
    const page=paginationModel.page+1;
    setCurrentPage(page);
    params.set('page',page.toString());
    navigate(`${pathName}?${params}`)
  }
  const handleEdit=(rowData)=>{
    setSelectedOrder( rowData);
    setUpdatedOpenModal(true);
  }

  return (
    <div>
      <h2 className='text-3xl font-bold text-gray-800'>Orders</h2>
        <div>
        <DataGrid
        paginationMode='server'
        rowCount={pagination.totalElements ||0}
        className='mt-6 w-full '
        rowHeight={60}
        rows={rows}
        columns={adminOrderTableColumns(handleEdit)}
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
      <Modal open={updatedOpenModal} setOpen={setUpdatedOpenModal} title="Update Order Status">
        <OrderStatusUpdateForm
        setOpen={setUpdatedOpenModal}
        open={updatedOpenModal}
        orderId={selectedOrder?.id}
        selectedItem={selectedOrder}
        loader={loader}
        setLoader={setLoader}
        />
      </Modal>
    </div>
  )
}

export default OrderTable