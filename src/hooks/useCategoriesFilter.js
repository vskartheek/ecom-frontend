import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { fetchCategories } from '../store/actions/index';

const useCategoriesFilter = () => {
  const [searchParams]=useSearchParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    const params=new URLSearchParams(searchParams);
    const currentPage=searchParams.get("page")?Number(searchParams.get("page")) :1;
    params.set("pageNumber", currentPage-1);
    const queryString=params.toString();
    dispatch(fetchCategories(queryString))
  },[dispatch,searchParams])
}

export default useCategoriesFilter