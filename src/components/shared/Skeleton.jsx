import React from 'react'
import { Skeleton as MuiSkeleton } from '@mui/material';
const Skeleton = () => {
  return (
    <div className='flex items-center flex-col gap-3 mt-5'>
        <MuiSkeleton variant="rectangular" width={310} height={100}/>
        <MuiSkeleton variant="rectangular" width={310} height={100} />
    </div>
  )
}

export default Skeleton