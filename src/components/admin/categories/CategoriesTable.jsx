import { minWidth } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid'
import { adminCategoryTableColumns} from '../../helper/tableColumn';
import React from 'react'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import NewCategoryForm from './NewCategoryForm';
import Modal from '../../shared/Modal';
import { MdAdd, MdPlusOne } from 'react-icons/md';
import UpdateCategoryForm from './UpdateCategoryForm';
import { set } from 'react-hook-form';
import DeleteCategoryForm from './DeleteCategoryForm';
const CategoriesTable = ({categories,pagination}) => {
  const rows =
  categories.map((category)=>({
    id:category.categoryId,
    categoryName:category.categoryName,
  }))
  const [editOpenModal,setEditOpenModal]=React.useState(false);
  const [deleteOpenModal,setDeleteOpenModal]=React.useState(false);
  const [createOpenModal,setCreateOpenModal]=React.useState(false);
  const [selectedCategory,setSelectedCategory]=React.useState(null);
  const [searchParams]=useSearchParams()
  const params=new URLSearchParams(searchParams);
  const pathName=useLocation().pathname;
  const navigate=useNavigate()
  
  // Get current page from URL params instead of state
  const currentPage = searchParams.get('page') ? Number(searchParams.get('page')) : 1;
  
  const handlePaginationChange=(paginationModel)=>{
    const page=paginationModel.page+1;
    params.set('page',page.toString());
    navigate(`${pathName}?${params}`)
  }
  const handleEdit=(rowData)=>{
    console.log("Row data for edit:", rowData);
    setSelectedCategory(rowData);
    setEditOpenModal(true);
  }

  const handleDelete=(rowData)=>{
    setSelectedCategory(rowData);
    setDeleteOpenModal(true);
  }
  const handleAddProduct=()=>{
    setCreateOpenModal(true);
  }

  return (
    <div>
      <div className='pt-6 pb-10 px-4 flex justify-end max-w-7xl mx-auto'>
      <button onClick={handleAddProduct} className='inline-flex items-center rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-600'>
                <MdAdd className='text-xl'/>
                Create Category
      </button>
      </div>
      <div className='max-w-7xl mx-auto px-4 text-center'>
      <h2 className='text-3xl font-bold text-gray-800'>Categories</h2>
        <div>
        <DataGrid
        paginationMode='server'
        rowCount={pagination.totalElements ||0}
        className='mt-6 w-250'
        rowHeight={60}
        rows={rows}
        columns={adminCategoryTableColumns(handleEdit,handleDelete)}
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
        pageSizeOptions={[pagination?.pageSize ||10 ]}
        pagination
        paginationOptions={{
          showFirstButton: true,
          showLastButton: true,
          hideNextButton:currentPage===pagination?.totalPages,
        }}   
      />
      </div>
      </div>

      {createOpenModal
       && <Modal
        open={createOpenModal}
        setOpen={setCreateOpenModal}
        title="Create New Category"
      >
        <NewCategoryForm
          setOpen={setCreateOpenModal}
        />
      </Modal>}

      {
        editOpenModal
        && <Modal
        open={editOpenModal}
        setOpen={setEditOpenModal}
        title="Update Category"
      >
        <UpdateCategoryForm
          setOpen={setEditOpenModal}
          selectedCategory={selectedCategory}
        />
      </Modal>
      }

      {
        deleteOpenModal
        && 
        <DeleteCategoryForm
          open={deleteOpenModal}
          setOpen={setDeleteOpenModal}
          selectedCategory={selectedCategory}
        />
      }
    </div>
  )
}

export default CategoriesTable