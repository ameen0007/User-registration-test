import React, { useContext, useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import './header.css'
import { Link, useNavigate } from "react-router-dom";
import { Authcontext } from "./ContextApi/Authcontext/Authcontext/Authcontext";
import { Modal } from "./Modal/Modal";
export const Header = () => {
  const [isOpen, setIsOpen,] = useState(false);
    
  const {auth ,clearAllUserData,userdetails,getUserData} =useContext(Authcontext)
     
const navigate = useNavigate()

const [toggle,setToggle]=useState(false)
  
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

  const handlenavigate =()=>{
    navigate('/signup')
  }

  const handlopen=()=>{
    setToggle(!toggle)
  }

  const handleclose = ()=>{
    setToggle(false)
  }
   
  const data = auth? 'logout' :'Sign Up'
  
  return (

    <nav className="flex justify-between py-6  overflow-hidden md:justify-around items-center h-16 border-b border-black  ">
    { toggle && <Modal handleclose={handleclose} />}
  {auth ?  (
    <div onClick={handlopen} className="pl-16  cursor-pointer">
      <img  className="object-cover w-[45px] h-[45px]  rounded-full border-gray-900 border-2" src={userdetails?.profilePic} alt="" />
      </div>
  ):(
     <p onClick={handlenavigate} className= " cursor-pointer text-[45px] pl-16 "><FaUserCircle /></p>
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
