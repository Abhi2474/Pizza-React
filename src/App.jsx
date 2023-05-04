import React, { useEffect, useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home, Login, Signup } from "./components"
import './index.css'
import { auth } from "./firebase"
import { FirebaseContext } from './context/FirebaseContext';

function App() {

  const [userName, setUserName] = useState('')
  const [ authenticated, setAuthenticated ] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName)
      } else setUserName('')
      user?.getIdToken().then(res=>{
        localStorage.setItem('accessToken', res)
        setAuthenticated(true)}
        )
    })
  }, [])

  return (
    <>
      <FirebaseContext.Provider value={{authenticated, setAuthenticated}}>
        <BrowserRouter>
          <Home name={userName} />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </FirebaseContext.Provider>
    </>
  )
}

export default App
