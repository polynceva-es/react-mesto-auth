import React from "react";
import { Routes, Route } from "react-router-dom";
import UserPageWithCards from "./pages/UserPageWithCard";
import Register from "./pages/Register";
import Login from "./pages/Login";


function App() {
  
  return (
   <>
    <Routes>
      <Route path="/" element={<UserPageWithCards/>}/>
      <Route path="/sing-up" element={<Register/>}/>
      <Route path="/sing-in" element={<Login/>}/>
      <Route path="*" element={<div>404 Page Not found</div>}/>
      {/* Чтобы была главная страница => <Route index element={<div>ROUTS</div>}/> */}
    </Routes>
    
   </> 
  )
}

export default App;
