import React from 'react'

const Success = ({msg}) => {
  return (
    <div className='bg-green-500 text-white p-2 rounded-md mt-6 text-md mb-4'>
       <i className="fa-solid fa-circle-check text-2xl"></i> {msg}
    </div>
  )
}

export default Success