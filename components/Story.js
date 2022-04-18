import React from 'react'

function Story({ img, username }) {
  return (
    <div className="cursor-pointer transition duration-100 ease-out hover:scale-105">
      <img
        src={img}
        className="h-14 w-14 rounded-full border-2 border-red-500 object-contain p-[1.5px]"
        alt=""
      />
      <p className="w-14 truncate text-center text-xs">{username}</p>
    </div>
  )
}

export default Story
