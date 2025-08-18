import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/actions';

const useProductFilter = () => {
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    const params=new URLSearchParams(searchParams);
    const currentPage=searchParams.get("page")?Number(searchParams.get("page")) :1;
    params.set("pageNumber", currentPage-1);
    const sortOrder=searchParams.get("sortby") || "asc";
    const category=searchParams.get("category") || null;
    const keyword=searchParams.get("keyword") || null;
    params.set("sortby", "price");
    params.set("sortOrder", sortOrder);
    if(category){
        params.set("category", category);
    }
    if(keyword){
        params.set("keyword", keyword);
    }

    const queryString=params.toString();
    console.log("Query String:", queryString);
    dispatch(fetchProducts(queryString))
  },[dispatch,searchParams])
}

export default useProductFilter