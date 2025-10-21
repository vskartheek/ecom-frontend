import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { fetchAdminProducts } from '../store/actions/adminActions';

const useAdminProductsFilter = () => {
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    const params=new URLSearchParams(searchParams);
    const currentPage=searchParams.get("page")?Number(searchParams.get("page")) :1;
    params.set("pageNumber", currentPage-1);
    const queryString=params.toString();
    dispatch(fetchAdminProducts(queryString))
  },[dispatch,searchParams])
}

export default useAdminProductsFilter