import React from 'react'

function Avatar({initialLetter, color}) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
        <span className="font-medium text-gray-700">{initialLetter}</span>
    </div>
  )
}

export default Avatar