import { current } from "@reduxjs/toolkit";
import api from "../../api/api"

export const fetchProducts=(query)=>async(dispatch)=>{
    try{
        dispatch({
            type:"IS_FETCHING"
        });
        const {data}=await api.get(`/public/products?${query}`);
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage
        });

        dispatch({
            type:"IS_SUCCESS"
        });

    }catch(error){
        console.log(error)
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Something went wrong"
        });
    }
}

export const fetchCategories=()=>async(dispatch)=>{
    try{
        dispatch({
            type:"IS_FETCHING"
        })
        const {data}=await api.get("/public/categories")
        dispatch({
            type:"FETCHED_CATEGORIES",
            payload:data.content,
            pageNumber:data.pageNumber,
            pageSize:data.pageSize,
            totalElements:data.totalElements,
            totalPages:data.totalPages,
            lastPage:data.lastPage
        })
        dispatch({
            type:"IS_SUCCESS"
        })
    }
    catch(error){
        console.log(error)
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Something went wrong"
        });
    }
}

export const removeFromCart=(productId)=>(dispatch,getState)=>{
    dispatch({
        type:"REMOVE_FROM_CART",
        payload:productId
    })
}

export const addToCart=(data,qty=1,toast)=>
    (dispatch,getState)=>{
        //Find the product
        const {products}=getState().products;
        const getProduct=products.find(
            (item)=>item.productId===data.productId
        )
        //check for stock
        const isQuantityExisits=getProduct.quantity>=qty;
        //if in stock add 
        if(isQuantityExisits){
            dispatch({
                type:"ADD_TO_CART",
                payload:{...data,quantity:qty}
            })
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
            toast.success(`${data?.productName} added to cart!`)
        }else{
            //error
            toast.error("Product stock limited!")
        }
    }

    export const increaseCartQuantity=
        (data,toast,currentQuantity,setCurrentQuantity)=>
        (dispatch,getState)=>{
            const {products}=getState().products;
            const getProduct=products.find(
                (item)=>item.productId===data.productId
            )
            const isQuantityExisits=getProduct.quantity>=currentQuantity+1;
            if(isQuantityExisits){
                const newQty=currentQuantity+1;
                setCurrentQuantity(newQty);
                dispatch({
                    type:"ADD_TO_CART",
                    payload:{...data,quantity:newQty}
                })
                localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
            }
            else{
                toast.error("Product stock limited!")
            }
        }

    export const decreaseCartQuantity=
        (data,newQuantity)=>
        (dispatch,getState)=>{
            dispatch({
                type:"ADD_TO_CART",
                payload:{...data,quantity:newQuantity},
            })
            localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        }

        

