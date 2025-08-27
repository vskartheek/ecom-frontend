import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState={
   products:[],
   pagination:{},

};

// export const fetchProducts=createAsyncThunk(
//    "products/fetchProducts",
//    async()=>{
//       const response=await api.get("public/products");
//       return response.data;
//    }
// )

// export const productSlice=createSlice({
//    name:"products Slice",
//    initialState,
//    reducers:{},
//    extraReducers:(builder)=>{
//       builder
//          .addCase(fetchProducts.pending,(state)=>{
//             state.status="loading";
//          })
//          .addCase(fetchProducts.fulfilled,(state,action)=>{
//             state.status="succeeded";
//             state.products=action.payload.content;
//             // Extract categories from products if they have category field
//             const categories = new Set();
//             action.payload.content.forEach(product => {
//                if(product.category) categories.add(product.category);
//             });
//             state.categories = Array.from(categories);
            
//             state.pagination = {
//                totalPages: action.payload.totalPages,
//                totalElements: action.payload.totalElements,
//                currentPage: action.payload.pageNumber,
//                pageSize: action.payload.pageSize,
//                lastPage: action.payload.lastPage
//             };
//          })
//          .addCase(fetchProducts.rejected,(state,action)=>{
//             state.status="failed";
//             state.error=action.error.message;
//          })
//       }
//    });

export const productReducer = (state=initialState,action)=>{
   switch(action.type){
      case "FETCH_PRODUCTS":
         return {
            ...state,
            products:action.payload,
            pagination:{
               ...state.pagination,
               pageNumber:action.pageNumber,
               pageSize:action.pageSize,
               totalElements:action.totalElements,
               totalPages:action.totalPages,
               lastPage:action.lastPage
            }
         }
      default:
         return state;

   }
}
