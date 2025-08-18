import React from 'react'
import {ClimbingBoxLoader} from 'react-spinners'

const CustomLoader = () => {
return (
    <div className="flex justify-center items-center min-h-screen">
        <ClimbingBoxLoader size={10}/>
    </div>
)
}

export default CustomLoader