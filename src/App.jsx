import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Navbar, Signup } from "./components";
import "./index.css";
import { auth } from "./firebase";
import { FirebaseContext } from "./context/FirebaseContext";
import Home from "./Pages/Home";

function App() {
  
  const [loginData, setLoginData] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoginData(user);
        user.getIdToken().then((res) => {
          localStorage.setItem("accessToken", res);
          setAuthenticated(true);
        });
      } else setLoginData("");
    });
  }, []);

  return (
    <>
      <FirebaseContext.Provider
        value={{  authenticated, loginData, setLoginData }}
      >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={authenticated ? <Home /> : <Login/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </FirebaseContext.Provider>
    </>
  );
}

export default App;
