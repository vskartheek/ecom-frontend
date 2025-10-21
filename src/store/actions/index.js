import { current } from "@reduxjs/toolkit";
import api from "../../api/api"
import { set } from "react-hook-form";
import { createCookie } from "react-router-dom";

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

export const fetchCategories=(queryString)=>async(dispatch)=>{
    console.log("Fetching categories with query:", queryString);
    try{
        dispatch({
            type:"IS_FETCHING"
        })
        const {data}=await api.get(`/public/categories${queryString ? `?${queryString}` : ''}`)
        console.log(data)
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

    export const authenticatedSignInUser=
        (sendData,toast,reset,navigate,setLoader)=>async(dispatch)=>{
    try{
        setLoader(true)
        const {data}=await api.post("/auth/signin",sendData)
        dispatch({
            type:"LOGIN_USER",
            payload:data
        })
        localStorage.setItem("auth",JSON.stringify(data))
        
        reset();
        toast.success("Login Successful!")
        navigate("/");
        setLoader(false);

    }catch(error){
        console.log(error)
        setLoader(false);
        toast.error(error?.response?.data?.message || "Something went wrong!")
    }
}

export const signOutUser=(toast,navigate)=>(dispatch)=>{
    try{
        dispatch({type:"LOGOUT_USER"})
        localStorage.removeItem("auth")
        toast.success("Logout Successfully!")
        navigate("/login")
    }
    catch(error){
        toast.error("Something went wrong!")
    }
}

export const signUpUser=(data,toast,reset,navigate,setLoader)=>async()=>{
    try{
        setLoader(true)
        const {res}=await api.post("/auth/signup",data)
        reset()
        toast.success(data?.message || "User Register Successfully. Login !!")
        navigate("/login")
        setLoader(false)

    }catch(error){
        setLoader(false);
        toast.error(error?.response?.data?.message || "Something went wrong!")
    }
}

export const addUpdateUserAddress=
(data,toast,addressId,reset,setOpen)=>
   async(dispatch,getState)=>{
   //const {user}=getState().auth;
   dispatch({type:"BUTTON_LOADER",payload:true})
   try{
        if(addressId){
            const {res}=await api.put(`/addresses/${addressId}`,data)
        }
        else{
        const {res}=await api.post("/addresses",data)
        reset()
        }
        dispatch(fetchUserAddresses())
        toast.success("Address saved Successfully.")
        dispatch({type:"BUTTON_LOADER",payload:false})

    }catch(error){
        toast.error(error?.response?.data?.message || "Something went wrong!")
        dispatch({type:"IS_ERROR",payload:null})
    }
    finally{
        setOpen(false)
    }
   
}

export const fetchUserAddresses=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get("/addresses")
        dispatch({
            type:"FETCHED_USER_ADDRESSES",
            payload:data
        })
        dispatch({type:"IS_SUCCESS"})
    }catch(error){
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || "Something went wrong"
        });
    }
}

export const selectAddress=(address)=>(dispatch)=>{
    localStorage.setItem("selectedAddress",JSON.stringify(address))
    dispatch({
        type:"SET_SELECTED_ADDRESS",
        payload:address
    })
}

export const deleteAddress=(addressId,toast)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"BUTTON_LOADER",payload:true})
        const {selectedAddress}=getState().auth
        if(selectedAddress?.addressId===addressId){
            dispatch({type:"SET_SELECTED_ADDRESS",payload:null})
        }
        const {res}=await api.delete(`addresses/${addressId}`)
        toast.success("Address deleted Successfully")
        dispatch(fetchUserAddresses())
    }catch(error){
        toast.error(error?.response?.data?.message || "Something went wrong!")
        dispatch({type:"IS_ERROR",payload:null})
    }
    finally{
        dispatch({type:"BUTTON_LOADER",payload:false})
        localStorage.removeItem("selectedAddress")
    }

}

export const setPaymentMethod=(method)=>(dispatch)=>{
    localStorage.setItem("paymentMethod",method)
    dispatch({
        type:"SET_PAYMENT_METHOD",
        payload:method
    })
}

export const createCart=(cartItems)=>async(dispatch,getState)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {message}=await api.post("/cart/create",cartItems)
        await dispatch(getUserCart())

    }catch(error){
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || ("Something went wrong")
        })
    }
}

export const getUserCart=()=>async(dispatch,getState)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get("/carts/users/cart")
        dispatch({
            type:"FETCHED_USER_CART",
            payload:data.products,
            totalPrice:data.totalPrice,
            cartId:data.cartId
        })
        localStorage.setItem("cartItems",JSON.stringify(getState().carts.cart))
        dispatch({type:"IS_SUCCESS"})
    }
    catch(error){
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || ("Something went wrong")
        })
    }
}

export const fetchClientSecretKey=(sendData)=>async(dispatch,getState)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.post("/order/stripe-client-secret",sendData)
        dispatch({
            type:"SET_CLIENT_SECRET_KEY",
            payload:data
        })
        dispatch({type:"IS_SUCCESS"})
        
    } catch (error) {
        dispatch({
            type:"IS_ERROR",
            payload:error?.response?.data?.message || ("Something went wrong")
        })
    }
}


export const stripePaymentConfirmation=(postData,setErrorMessage,setLoading,toast)=>
    async(dispatch,getState)=>{
    try {
        const response=await api.post("/order/users/payments/online",postData)
        if(response.data){
            localStorage.removeItem("cartItems")
            localStorage.removeItem("selectedAddress")
            localStorage.removeItem("paymentMethod")
            dispatch({
            type:"SET_CLIENT_SECRET_KEY",
            payload:null
            })
            dispatch({
            type:"SET_SELECTED_ADDRESS",
            payload:null
            })
            dispatch({
            type:"SET_PAYMENT_METHOD",
            payload:null
            })
            dispatch({
            type:"CLEAR_CART",
            payload:null
            })
            toast.success("Order placed Successfully!")
        }
        else{
            setErrorMessage("Payment failed! Please try again")
        }
        
    } catch (error) {
            setErrorMessage("Payment failed! Please try again")

    }
}



