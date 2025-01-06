import React, { useContext, useEffect } from 'react'
import { Header } from '../../Components/Header/Header'
import { Authcontext } from '../../Components/Header/ContextApi/Authcontext/Authcontext/Authcontext';


export const Homepage = () => {
     


  return (
    <div >
   <Header/>
         <h1 className='text-center mt-52'>Home Page</h1>
    </div>
  )
}
