import React, { useContext, useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import { Authcontext } from '../ContextApi/Authcontext/Authcontext/Authcontext';
import { useNavigate } from 'react-router-dom';

export const Modal = ({handleclose}) => {
    
    const {userdetails} = useContext(Authcontext)
    const navigate = useNavigate()

    useEffect(() => {
        AOS.init({
          duration: 200,  // Set animation duration in milliseconds
          easing: 'ease-in',  // Set easing effect (optional)
          once: true,  // Only animate once (optional)
        });
      }, []);

      const handlenavigate =()=>{
        navigate("/Profile")
      }



  return (
        <div  onClick={handleclose} className='absolute inset-0 bg-black/50 backdrop-blur-sm z-20'>
    
                    <div    className="absolute w-full h-auto gap-5 flex flex-col justify-center items-center top-[35%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 " >
                             <img src={userdetails.profilePic}  data-aos="zoom-in" className=" w-[200px] h-[200px] bg-slate-50 rounded-full object-cover">
                     
                  </img>
                    <button onClick={handlenavigate}  data-aos="zoom-in" className="text-[11px] font-sans font-medium hover:bg-white hover:text-black bg-black text-white px-7 py-2 rounded-lg" >View Profile</button>
                   </div>
               
           </div>
  )
}
