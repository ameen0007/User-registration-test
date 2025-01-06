import React from 'react'
import { ClipLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <>
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20"></div>
          < ClipLoader className="absolute z-30" color="rgb(79 70 229" size={50} />
          </>
  )
}
