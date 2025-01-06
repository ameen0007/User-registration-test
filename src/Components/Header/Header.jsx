import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import './header.css'
import { useNavigate } from "react-router-dom";
import { Authcontext } from "./ContextApi/Authcontext/Authcontext/Authcontext";
export const Header = () => {
  const [isOpen, setIsOpen,] = useState(false);
    
  const {auth ,clearAllUserData,userdetails,getUserData} =useContext(Authcontext)
     
const navigate = useNavigate()


  
 console.log(userdetails.profilePic,"inside header");
 console.log(auth,"auth");
 
 
  const handlenav =(item)=>{
    console.log(item,"item");
    if(item==='logout'){
      console.log("called?//////////");
      clearAllUserData()

    }
     if(item==='Sign Up'){
      navigate('/signup')
     }
    
   
    setIsOpen(!isOpen)
  }
   
  const data = auth? 'logout' :'Sign Up'
  
  return (
    <nav className="flex justify-between py-6  overflow-hidden md:justify-around items-center h-16 border-b border-black  ">
  {auth ?  (
    <div className="pl-16">
      <img className="w-[45px] h-[45px]  rounded-full border-gray-900 border-2" src={userdetails?.profilePic} alt="" />
      </div>
  ):(
     <p className="text-[45px] pl-16 "><FaUserCircle /></p>
  )
    
  }
      

      <button onClick={()=>setIsOpen(!isOpen)} className="md:hidden cursor-pointer pr-16">
       
         
      
          <FaBars className=" mt-[5px] text-[25px] " />
        
      </button>
      <ul className={isOpen? 'left-div active' : 'left-div '}>

      <button onClick={()=>setIsOpen(!isOpen)} className="md:hidden cursor-pointer text-[20px] "><FaTimes className=" mt-[5px] absolute z-30 top-10 right-10 " /></button>

        {["Home", "About", "Services", data].map((item, i) => (
          <li key={i} onClick={()=>handlenav(item)} className="cursor-pointer">
            {item}
          </li>
        ))}
       
      </ul>
    </nav>
  );
};
