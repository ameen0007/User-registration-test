import React, { useContext, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios'
import { Authcontext } from "../../Components/Header/ContextApi/Authcontext/Authcontext/Authcontext";
import Dexie from "dexie";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export const Form = () => {
     const navigate = useNavigate()
  const {userdetails,setLoading,setUserDetails,loading,getUserData,setAuth,uploaddata} = useContext(Authcontext)
   const CLOUD_NAME = "dhn7yfp0z"
   const UPLOAD_PRESET = "upload_image"
   
  console.log(loading,'lo');
  
    const [errorss,setErrors] = useState({})
     const [previewimage , setPreviewimage ] = useState(null)
    
  const handleform =(e)=>{ 
    const {value,type,name,files} = e.target

    if(type === "file" ){
      const photo = URL.createObjectURL(e.target.files[0]) 
      setPreviewimage(photo)
      setUserDetails({
        ...userdetails, [name] : files[0]
      })
    }else{
      setUserDetails({
        ...userdetails, [name] : value
      })
    }

  }

  const handleclose =()=>{
    setPreviewimage(null)
  }

  // profilePic : null,
  // firstName : "",
  // email :"",
  // phone : "",
  // password : "",
  // confirmPassword : ""
  
  const validate =()=>{
     const errors = {}
     const {profilePic,firstName,email,phone,password,confirmPassword} = userdetails
      
     if(profilePic === null){
       errors.profilePic = "Please upload your profile pic"
     }

     if(firstName.trim() === ""){
        errors.firstName = "FirstName is Required"
     }else if(firstName.length < 3){
        errors.firstName = "Atleast 3 character required"
     }

     if(email.trim() === ""){
      errors.email = "Email is required "
    }else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
      if (!emailRegex.test(email)) {
        errors.email = "Please enter a valid email address";
    }
  }

    if(phone.trim() === ""){
      errors.phone = "Phone number is required "
    }else{
      const phoneRegex = /^[0-9]{10}$/;

      if (!phoneRegex.test(phone)) {
        errors.phone = "Phone number must be 10 digits and only contain numbers";
      }
    }

    if(password.trim() === ""){
      errors.password = "Password is Required"
    }

    if (confirmPassword.trim() === ""){
       errors.confirmPassword = "confirmPassword is Required"
    }else if(password !== confirmPassword ){
      errors.confirmPassword ="password and confirmPassword must be same "
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
   
    
  }
  

  const handlsubmit = async(e)=>{
   e.preventDefault()
   setLoading(true)
  console.log("inside submit");
  
   if(validate()){
    console.log("inside if");
    const formdata = new FormData()
    formdata.append("file",userdetails.profilePic)
    formdata.append('upload_preset',UPLOAD_PRESET)
    try {
    const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,formdata)
    const img = response.data.secure_url

   const  Newdata = ({
      ...userdetails ,
      profilePic :img
    })
    setUserDetails(Newdata)
     
    await uploaddata(Newdata)
      navigate('/') 
      setLoading(false)
   } catch (error) {
    console.log("inside catch");
    setLoading(false)
    console.log(error,'errors');
     
  }
  
}
console.log("outside if");
setLoading(false)
console.log(errorss,'errors');

  return
  }
  
 
  

  return (
    <div className=" relative flex items-center justify-center min-h-screen bg-gray-100">
    {loading && (
        <>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-20"></div>
          <ClipLoader className="absolute z-30" color="rgb(79 70 229" size={50} />
        </>
      )}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          User Registration
        </h2>
        <form className="space-y-4">
          {/* Profile Picture Upload */}
        { !previewimage ? (
          <>
            <div className="flex items-center justify-center">
            <label
              htmlFor="profilePic"
              className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 bg-gray-200 rounded-full shadow-md border border-dashed border-gray-300 text-gray-500 hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.75v14.5m7-7H4.75"
                />
              </svg>
              <span className="text-sm">Upload</span>
            </label>
            <input id="profilePic" name="profilePic" type="file" accept="image/*" className="hidden" onChange={handleform} />
            
          </div>
            {errorss.profilePic && <p className="tracking-wide text-center text-[12px] text-red-500 font-mono">{errorss.profilePic}</p>}
          </>
          
        ):(
          <div className="w-[100%] flex justify-center p-5 border-dashed border-2 border-gray-500 relative">
            <img src={previewimage} alt="" className="  w-[100%] h-auto object-contain" />
            <p onClick={handleclose} className="absolute top-[1px] right-0 text-[22px] cursor-pointer "><IoMdCloseCircle /></p>
          </div>
        )}
          
          

          {/* First Name */}
          <div>
            <label
              htmlFor="firstName"
              
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              First Name
            </label>
            <input
            onChange={handleform}
              id="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
           {errorss.firstName && <p className=" tracking-wide text-left pl-1 text-[12px] text-red-500 font-mono">{errorss.firstName}</p>}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
            onChange={handleform}
              id="email"
              type="email"
                name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             {errorss.email && <p className=" tracking-wide text-left pl-1 text-[12px] text-red-500 font-mono">{errorss.email}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <input
            onChange={handleform}
              id="phone"
              type="tel"
                name="phone"
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             {errorss.phone && <p className=" tracking-wide text-left pl-1 text-[12px] text-red-500 font-mono">{errorss.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
            onChange={handleform}
              id="password"
              type="password"
               name="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             {errorss.password && <p className=" tracking-wide text-left pl-1 text-[12px] text-red-500 font-mono">{errorss.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
            onChange={handleform}
              id="confirmPassword"
              type="password"
               name="confirmPassword"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             {errorss.confirmPassword && <p className=" tracking-wide text-left pl-1 text-[12px] text-red-500 font-mono">{errorss.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <div>
            <button
            onClick={handlsubmit}
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Register
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};
