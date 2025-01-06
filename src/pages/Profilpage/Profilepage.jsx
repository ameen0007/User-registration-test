import React, { useContext, useEffect, useState } from 'react';
import { Authcontext } from '../../Components/Header/ContextApi/Authcontext/Authcontext/Authcontext';
import axios from 'axios';
import { Loader } from '../../Components/Header/Loader/Loader';

export const ProfilePage = () => {
    
    const {userdetails,updateUserData,loading,setLoading} = useContext(Authcontext)
    const [isEdited , setIsEdited] = useState(false)
    const [tempdata,setTempdata] = useState(userdetails)
     const [errorss,setErrors] = useState({})    
 const [preiv,setPreview]=useState(null)

    const CLOUD_NAME = "dhn7yfp0z"
   const UPLOAD_PRESET = "upload_image"

    useEffect(() => {
        setTempdata(userdetails);
      }, [userdetails]);

    // profilePic : null,
    // firstName : "",
    // email :"",
    // phone : "",
    // password : "", 
    // confirmPassword : "" inside userdetails structure
  
    //   console.log(userdetails,"userdetails");
     
      
    const handleedit =()=>{
        setTempdata(userdetails);
        setIsEdited(!isEdited)
    }

    const validate =()=>{
        const errors = {}
        const {profilePic,firstName,email,phone,password,confirmPassword} = tempdata
         
        if(profilePic === null){
          errors.profilePic = "Please upload your profile pic"
        }
   
        if(firstName.trim() === ""){
           errors.firstName = "FirstName is Required"
        }else if(firstName.length < 3){
           errors.firstName = "Atleast 3 character required"
        }else {
         const nameRegex = /^[A-Za-z]+$/; // This regex allows only alphabets (both uppercase and lowercase)
         
         if(!nameRegex.test(firstName)) {
           errors.firstName = "First Name must contain only letters";
         }
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
   
       setErrors(errors)
       console.log(Object.keys(errors).length === 0,"errors");
       
       return Object.keys(errors).length === 0
     }
    

    const handlsave = async()=>{
        setLoading(true)
         if(validate()){
            
            const formdata = new FormData()
            formdata.append("file",tempdata.profilePic)
            formdata.append('upload_preset',UPLOAD_PRESET)
            try {
            const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,formdata)
            const img = response.data.secure_url
             
            const newdata = ({
                ...tempdata,
                profilePic :img
            })
            console.log(newdata,"newdataaa");
            
            //  setTempdata({
            //     ...tempdata,
            //     profilePic :img
            //  })
            
            await updateUserData(newdata)

            setIsEdited(false)
         } catch (error) {
            console.log("inside catch");
            setLoading(false)
            console.log(error,'errors');
             
          }
        }
        setLoading(false)
    }
  
    const handlechangedata = (e)=>{

       const {name ,value,type,files} = e.target

       if(type === "file"){
         
         const photo = URL.createObjectURL(files[0])
         setPreview(photo)
         
        setTempdata({
            ...tempdata,
            [name] : files[0]
           })
       }else{
       setTempdata({
        ...tempdata,
        [name] : value
       })
    }
       
       
    }


     
   
  return (
    <div className="relative min-h-screen bg-gray-100 flex justify-center items-center p-6">
        {loading && <Loader/> }
      <div className="bg-white shadow-md rounded-lg w-full max-w-3xl p-6">
        <h1 className='text-2xl text-gray-700 font-bold text-center mb-4'>Profile Details</h1>
        <div className="flex flex-col items-center gap-4 mb-6">
        <div className="relative">
      <img
        src={preiv ? preiv : tempdata.profilePic}
        alt="Profile"
        className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover"
      />
      {isEdited &&
            <label
      
            className="absolute bottom-0 right-2 bg-blue-600 text-white text-xs px-3 py-1 rounded-full shadow-md hover:bg-blue-700 cursor-pointer"
          >
            Change
            <input
            onChange={handlechangedata}
              className="hidden"
              name="profilePic"
              type="file"
              accept="image/*"
            />
          </label>
      }
    
    </div>

          <h2 className="text-2xl font-bold text-gray-700">{userdetails.firstName}</h2>
          <p className="text-gray-500">{userdetails.email}</p>
        </div>

        {/* Form Section */}
        <form className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              name='firstName'
              disabled={!isEdited}
              value={tempdata.firstName}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name"
              onChange={handlechangedata}
            />
             {errorss.firstName && <p className="tracking-wide text-left text-[12px] text-red-500 font-mono">{errorss.firstName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
             value={tempdata.email}
              type="email"
              name='email'
              disabled={!isEdited}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email"
              onChange={handlechangedata}
            />
            {errorss.email && <p className="tracking-wide text-left text-[12px] text-red-500 font-mono">{errorss.email}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
             disabled={!isEdited}
              type="text"
            name='phone'
              value={tempdata.phone}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123-456-7890"
              onChange={handlechangedata}
            />
             {errorss.phone && <p className="tracking-wide text-left text-[12px] text-red-500 font-mono">{errorss.phone}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Change Password</label>
            <input
             disabled={!isEdited}
             value={tempdata.password}
             name='password'
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              onChange={handlechangedata}
            />
             {errorss.password && <p className="tracking-wide text-left text-[12px] text-red-500 font-mono">{errorss.password}</p>}
          </div>
        </form>

        {/* Action Buttons */}
        { isEdited ?  (      
        <div className="flex justify-between items-center gap-4 mt-6">
          <button onClick={handleedit} className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handlsave} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            Save
          </button>
        </div>
          ):(
            <div className="flex justify-end items-center gap-4 mt-6">
            <button onClick={handleedit} className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Edit
            </button>
            </div>
          )}  
      </div>
    </div>
  );
};
