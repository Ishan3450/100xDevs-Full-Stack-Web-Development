import React from 'react'

function Balance({balance}) {
  return (
    <div className='font-medium mt-3 w-fit py-4 px-5 flex gap-3 items-center border rounded-md'>
        <div>Your balance</div>
        <div className=' text-3xl'>₹ {balance}</div>
    </div>
  )
}

export default Balance