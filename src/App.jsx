import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Homepage } from './pages/Homepage/Homepage'
import { Route, Routes } from 'react-router-dom'
import { Form } from './pages/RegisterForm/Form'
import { Protectedlogin } from './Components/Header/ContextApi/Authcontext/Authprotected/Authprocted'
import { ProfilePage } from './pages/Profilpage/Profilepage'



function App() {
 

  return (
    <>
    <Routes>
    <Route element={<Protectedlogin/>} >
    <Route path='/signup' element={<Form/>} />
    
    </Route>
    <Route path="/Profile"  element={<ProfilePage/>} />
    <Route path='/' element={<Homepage/>} />
    </Routes>
    </>
  )
}

export default App
