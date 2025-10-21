import { GridDeleteIcon } from '@mui/x-data-grid';
import { FaEdit, FaEye, FaImage } from 'react-icons/fa';
export const adminOrderTableColumns =(handleEdit)=>{
  
  return [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: 'id',
    headerName: 'Order Id',
    minWidth:180,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Order Id</span>
   },
    { 
    disableColumnMenu: true,
    field: 'email',
    headerName: 'Email',
    align:"center",
    width:250,
    headerAlign:'center',
    editable:false,
    sortable: false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span>Email</span>
   },
    { 
    sortable: true,
    disableColumnMenu: true,
    field: 'totalAmount',
    headerName: 'Total Amount',
    minWidth:200,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Total Amount</span>
   },
   { 
    sortable: false,
    disableColumnMenu: true,
    field: 'orderDate',
    headerName: 'Order Date',
    minWidth:200,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Order Date</span>
   },
    { 
    sortable: false,
    disableColumnMenu: true,
    field: 'orderStatus',
    headerName: 'status',
    minWidth:200,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'>Status</span>
   },
    { 
    sortable: false,
    disableColumnMenu: true,
    field: 'action',
    headerName: 'Action',
    minWidth:250,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'> Action </span>,

    renderCell:(params)=>{
      return (
        <div className='flex gap-2 items-center justify-center space-x-2 h-full pt-2'>
            <button onClick={() => handleEdit(params.row)} className='bg-blue-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-blue-700 transition-all duration-300'>
                <FaEdit className='mr-2'/> Update
            </button>
        </div>
      );
    },
   },
];
}


export const adminProductsTableColumns =({handleEdit,handleDelete,handleImageUpdate,handleView})=>{
  
  return [
  { 
    sortable: false,
    disableColumnMenu: true,
    field: 'id',
    headerName: 'Product Id',
    minWidth:120,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Product Id</span>
   },
    { 
    disableColumnMenu: true,
    field: 'productName',
    headerName: 'Product Name',
    align:"center",
    width:230,
    headerAlign:'center',
    editable:false,
    sortable: false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span>Product Name</span>
   },
   { 
    disableColumnMenu: true,
    field: 'description',
    headerName: 'Description',
    align:"center",
    width:250,
    headerAlign:'center',
    editable:false,
    sortable: false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span>Description</span>
   },
    { 
    sortable: true,
    disableColumnMenu: true,
    field: 'price',
    headerName: 'Price',
    minWidth:100,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Price</span>
   },
   { 
    sortable: false,
    disableColumnMenu: true,
    field: 'quantity',
    headerName: 'Quantity',
    minWidth:100,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold border',
    cellClassName:"text-gray-600 border text-center",
    renderHeader:(param)=><span  className='text-center'>Quantity</span>
   },
    { 
    sortable: false,
    disableColumnMenu: true,
    field: 'discount',
    headerName: 'Discount',
    minWidth:100,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'>Discount</span>
   },

   { 
    sortable: false,
    disableColumnMenu: true,
    field: 'specialPrice',
    headerName: 'Special Price',
    minWidth:110,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'>Special Price</span>
   },

   { 
    sortable: false,
    disableColumnMenu: true,
    field: 'image',
    headerName: 'Image',
    minWidth:200,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'>Image</span>,
    renderCell:(params)=>{
      return (
        <img src={params.value} alt={params.row.productName} className="h-12 w-12 object-cover mx-auto"/>
      );
    }
   },
    { 
    sortable: false,
    disableColumnMenu: true,
    field: 'action',
    headerName: 'Action',
    minWidth:400,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'> Action </span>,
    renderCell:(params)=>{
      return (
        <div className='flex gap-2 items-center justify-center space-x-2 h-full pt-2'>
            <button onClick={() => handleImageUpdate(params.row)} className='bg-slate-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-slate-700 transition-all duration-300'>
                <FaImage className='mr-2'/> Image
            </button>
            <button onClick={() => handleEdit(params.row)} className='bg-blue-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-blue-700 transition-all duration-300'>
                <FaEdit className='mr-2'/> Update
            </button>
            <button onClick={()=>handleDelete(params.row)} className='bg-red-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-red-700 transition-all duration-300'>
                <GridDeleteIcon className='mr-2'/> Delete
            </button>
            <button onClick={()=>handleView(params.row)} className='bg-green-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-green-700 transition-all duration-300'>
                <FaEye className='mr-2'/> View
            </button>
        </div>
      );
    },
   },
];
}


export const adminCategoryTableColumns =(handleEdit,handleDelete)=>{
  
  return [
  {
    sortable: false,
    disableColumnMenu: true,
    field: 'id',
    headerName: 'Category Id',
    align:"center",
    minWidth:180,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'>Category Id</span>
   },
    { 
    disableColumnMenu: true,
    field: 'categoryName',
    headerName: 'Category Name',
    align:"center",
    width:250,
    headerAlign:'center',
    editable:false,
    sortable: false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span>Category Name</span>
   },

   { 
    sortable: false,
    disableColumnMenu: true,
    field: 'action',
    headerName: 'Action',
    minWidth:250,
    headerAlign:'center',
    editable:false,
    headerClassName:'text-black font-semibold text-center border',
    cellClassName:"text-slate-700 font-normal border text-center",
    renderHeader:(param)=><span  className='text-center'> Action </span>,
    renderCell:(params)=>{
      return (
        <div className='flex gap-2 items-center justify-center space-x-2 h-full pt-2'>
            <button onClick={()=>handleEdit(params.row)} className='bg-blue-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-blue-700 transition-all duration-300'>
                <FaEdit className='mr-2'/> Update
            </button>
            <button onClick={()=>handleDelete(params.row)} className='bg-red-600 flex items-center text-white px-3 py-1 h-9 rounded-md hover:bg-red-700 transition-all duration-300'>
                <GridDeleteIcon className='mr-2'/> Delete
            </button>
        </div>
      );
    },
   },
]
}

