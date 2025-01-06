import Dexie from "dexie"
import { createContext, useEffect, useState } from "react"

   
  export const Authcontext = createContext()

   export const Authprovider =({children})=>{

    const [loading,setLoading]=useState(false)
    const [auth,setAuth]=useState(false)
   
    const db = new Dexie("UserDB");
    db.version(1).stores({
      userData: "++id, profilePic, firstName, email, phone, password, confirmPassword", // Use auto-incremented id
    });

        
       const [userdetails,setUserDetails] = useState({
          profilePic : null,
          firstName : "",
          email :"",
          phone : "",
          password : "",
          confirmPassword : ""
         })

         const getUserData = async () => {
          console.log("Fetching user data from IndexedDB...");
           
          try {
            const data = await db.userData.toArray();
             console.log(data,"getted userdata");
             setAuth(true); 
            console.log("Data fetched from IndexedDB:", data[0]);
            if (Array.isArray(data) && data.length > 0) {
              
              
              
              setUserDetails(data[0])
              console.log("User data fetched from IndexedDB:", data[0]);
            } else {
              setAuth(false); 
              console.log("No user data found.");
            }
          } catch (error) {
            console.log("Error fetching data from IndexedDB:", error);
          }
        };
        const clearAllUserData = async () => {
          console.log("hi1");
          
          try {
            await db.userData.clear(); // Clears all records from the userData table
          setAuth(false)
          setUserDetails({
            profilePic : null,
            firstName : "",
            email :"",
            phone : "",
            password : "",
            confirmPassword : ""
           })
            console.log("All user data deleted from IndexedDB.");
          } catch (error) {
            console.error("Error deleting data from IndexedDB:", error);
          }
        };

        const uploaddata = async(newdata)=>{

          try {
          console.log(newdata,"before upload userdata");
          
            await db.userData.add(newdata);
            console.log("User data saved to IndexedDB:", newdata);
            
          await getUserData()
            console.log("data added.");
          } catch (error) {
            console.error("Error uploading", error);
          }
        };
        
      

        useEffect(() => {
          getUserData(); 
        }, []);
    


      
    return(
         
          <Authcontext.Provider value={{uploaddata,clearAllUserData,setUserDetails, userdetails,loading , setLoading,auth,getUserData,setAuth}}>
            {children}
         </Authcontext.Provider>
    )
   }