import React from 'react'

function Popup({ content }) {
  return (
    <>
      <div className='border-2 border-black p-5 bg-gray-400 text-white text-center font-bold'>
        <h1>{content}</h1>
      </div>
    </>
  )
}

export default Popup
