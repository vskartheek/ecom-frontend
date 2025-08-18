import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import React, { useEffect } from 'react'
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCategories } from '../../store/actions';
const Filter = ({categories}) => {
    const dispatch=useDispatch();
    const [searchParams]=useSearchParams();
    const pathname=useLocation().pathname;
    const params=new URLSearchParams(searchParams);
    const navigate=useNavigate();
    const [category,setCategory]=React.useState("all");
    const [sortOrder,setSortOrder]=React.useState("asc");
    const [keyword,setKeyword]=React.useState("");
    const [isAsc,setIsAsc]=React.useState(true);
    useEffect(()=>{
        const currentCategory=searchParams.get("category")||"all";
        const currentSortOrder=searchParams.get("sortby")||"asc";
        const currentKeyword=searchParams.get("keyword")||"";
        const isAsc= currentSortOrder==="asc"? true : false;
        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setKeyword(currentKeyword);
        setIsAsc(isAsc);
    },[searchParams])

    useEffect(()=>{
        const handler=setTimeout(()=>{
            if(keyword){
                searchParams.set("keyword",keyword);
            } else {
                searchParams.delete("keyword");
            }
            navigate(`${pathname}?${params}`)
        },1000)
        return ()=>{
            clearTimeout(handler)
        }
    },[searchParams,keyword,navigate,pathname])



    const handleCategoryChange=(e)=>{
        const value=e.target.value;
        if(value==="all"){
            params.delete("category");
        }else{
            params.set("category",value)
        }
        setCategory(value);
        navigate(`${pathname}?${params}`)
    };

    const handleSortOrderChange=(e)=>{
        const value=isAsc?"desc":"asc";
        setSortOrder(value);
        setIsAsc(!isAsc);
        params.set("sortby",value);
        navigate(`${pathname}?${params}`)
    }

    const handleRemoveFilters=()=>{
        navigate({pathname:window.location.pathname})
        
    }
  return (
    <div className='flex lg:flex-row flex-col-reverse lg:justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-[#1976d2]'>
        <div className='relative flex items-center  2xl:w-[450px] sm:w-[420px] w-full'>
            <input 
                type="text"
                placeholder=' Search products'
                value={keyword}
                onChange={(e)=>setKeyword(e.target.value)}
                className='border border-gray-500 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-1' 
            />
            <FiSearch className='absolute left-3 text-slate-800 size={20}'/>
        </div>
        <div className='flex lg:flex-row flex-col gap-4 items-center'>
            <FormControl variant='outlined' size='small'
            className='text-slate-800 border-slate-700'>
                <InputLabel id='category-select-label'> Category</InputLabel>
                <Select labelId='category-select-label'
                    onChange={handleCategoryChange}
                    value={category}
                    label="Category"
                    className='min-w-[120px] text-slate-800 border-slate-700'
                    >
                    <MenuItem value="all"> All</MenuItem>
                {categories.map((item)=>(
                    <MenuItem key={item.categoryId} value={item.categoryName}>{item.categoryName}</MenuItem>
                ))}
                </Select>
            </FormControl>

            {/* SORT BUTTON AND CLEAR FILTER */}
            <Tooltip title={isAsc?"Sort By Desc":"Sort By Asc"}>
                <Button onClick={handleSortOrderChange} variant='contained' color='primary' className='flex items-center gap-2 h-10'>
                    Sort By
                    {isAsc?(
                        <FiArrowUp size={20}/>
                    ):(
                        <FiArrowDown size={20}/>
                    )}
                    
                </Button>
            </Tooltip>
            <button onClick={handleRemoveFilters}
            className='flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none'
            >
                <FiRefreshCw className='font-semibold' size={16}/>
                <span className='font-semibold'> Clear Filter</span>
            </button>
        </div>
    </div>
  )
}

export default Filter