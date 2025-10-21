import { fetchCategories, fetchProducts } from "."
import api from "../../api/api"

export const fetchAnalytics=()=>async(dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get("/admin/app/analytics")
        dispatch({type:"FETCH_ANALYTICS",payload:data})
        dispatch({type:"IS_SUCCESS"})
    }
    catch(err){
        console.log(err)
        dispatch({type:"IS_ERROR",payload:err.response?.data?.message||err.message})
    }
}

export const fetchAdminOrders=(queryString)=>async(dispatch)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.get(`/admin/orders?${queryString}`)
        dispatch({type:"FETCH_ADMIN_ORDERS",payload:data})
        dispatch({type:"IS_SUCCESS"})
    } catch (error) {
        dispatch({type:"IS_ERROR",payload:error.response?.data?.message||error.message})
    }
}

export const updateOrderStatus=(orderId,setLoader,setError,status,setOpen,toast)=>async(dispatch)=>{
    try{
        setLoader(true)
        const {data}=await api.put(`/admin/orders/${orderId}/status`,{status})
        setLoader(false)
        toast.success("Order Status Updated Successfully")
        dispatch(fetchAdminOrders())
        setOpen(false)
    }catch(e){
        setLoader(false)
        toast.error("Unable to update the Order Status")
        setError(e?.message)
    }
}

export const fetchAdminProducts=(queryString)=>async(dispatch)=>{
    try{
        dispatch({
            type:"IS_FETCHING"
        });
        const {data}=await api.get(`/admin/products?${queryString}`);
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

export const updateAdminProducts=(sendData,toast,setOpen)=>async(dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.put(`/admin/products/${sendData.productId}`,sendData)
        toast.success("Product Updated Successfully")
        dispatch(fetchProducts())
        dispatch({type:"IS_SUCCESS"})
    }catch(error){
        toast.error("Unable to update the Product")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}

export const addAdminProducts=(sendData,toast,setOpen,categoryId)=>async(dispatch)=>{
    
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.post(`/admin/categories/${Number(categoryId)}/product`,sendData)
        toast.success("Product Added Successfully")
        dispatch(fetchProducts())
        dispatch({type:"IS_SUCCESS"})
        setOpen(false)
    } catch (error) {
        toast.error("Unable to add the Product")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
}

export const deleteAdminProducts=(productid,setOpen,toast)=>async(dispatch)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.delete(`/admin/products/${Number(productid)}`)
        toast.success("Product Deleted Successfully")
        dispatch(fetchProducts())
        dispatch({type:"IS_SUCCESS"})

    } catch (error) {
        toast.error("Unable to delete the Product")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}

export const updateProductImage=(productId,formData,toast,setOpen)=>async(dispatch)=>{
    try{
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.put(`/admin/products/${Number(productId)}/image`,formData)
        toast.success("Image updated Successfully")
        dispatch(fetchProducts())
        dispatch({type:"IS_SUCCESS"})
    }catch{
        toast.error("Unable to update the Product Image")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}

export const createNewCategory=(categoryName,toast,setOpen)=>async(dispatch)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.post(`/admin/categories`,{categoryName})
        toast.success("Category created successfully")
        dispatch(fetchCategories())
        dispatch({type:"IS_SUCCESS"})
        
    } catch (error) {
         toast.error("Unable to create category")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}

export const updateAdminCategory=(sendData,toast,setOpen)=>async(dispatch)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.put(`/admin/categories/${Number(sendData.id)}`,sendData)
        toast.success("Category Updated successfully")
        dispatch(fetchCategories())
        dispatch({type:"IS_SUCCESS"})
        
    } catch (error) {
         toast.error("Unable to Update category")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}


export const deleteAdminCategory=(selectedcategory,setOpen,toast)=>async(dispatch)=>{
    try {
        dispatch({type:"IS_FETCHING"})
        const {data}=await api.delete(`/admin/categories/${Number(selectedcategory.id)}`)
        toast.success("Category Deleted Successfully")
        dispatch(fetchCategories())
        dispatch({type:"IS_SUCCESS"})

    } catch (error) {
        toast.error("Unable to delete the Category")
        console.log(error)
        dispatch({type:"IS_ERROR",payload:error?.response?.data?.message || "Something went wrong"})
    }
    finally{
        setOpen(false)
    }
}
