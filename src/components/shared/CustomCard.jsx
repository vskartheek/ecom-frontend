import { Card } from '@mui/material'
import React from 'react'

const CustomCard = ({cardName,cardValue,cardIcon}) => {
  return (
    <Card className="w-72 h-72 flex flex-col justify-between shadow-xl rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-100 hover:shadow-2xl transition-all">
      <div className="flex flex-row justify-between items-center px-6 pt-6">
        <p className="text-gray-700 text-lg font-semibold tracking-wide">{cardName}</p>
        <span className="text-4xl text-green-500 bg-green-100 rounded-lg p-2 shadow-sm">{cardIcon}</span>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <h4 className="text-5xl font-extrabold text-gray-900 drop-shadow-lg">{cardValue}</h4>
      </div>
      <div className="px-6 pb-6 flex justify-end">
      </div>
    </Card>
  )
}

export default CustomCard