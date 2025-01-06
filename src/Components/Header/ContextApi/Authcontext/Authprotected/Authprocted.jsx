import { useContext } from "react"
import { Authcontext } from "../Authcontext/Authcontext"
import { Navigate, Outlet } from "react-router-dom"



export const Protectedlogin =()=>{
     
    const {auth} = useContext(Authcontext)
    console.log(auth,"auth");
    
    if(auth){

        return <Navigate to="/"/>
    }
   return <Outlet/>
}