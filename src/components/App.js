import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UserPageWithCards from "./pages/UserPageWithCard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);//false
  // const navigate = React.useNavigate();
  
  function onSubmitRegister(values) {
    register(values);
    //navigate to='/cards'
  }

  function onSubmitLogin(values) {
    login(values)    
    .then(res=> {checkToken(res.token)});
  }

  return (
   <>
    <Routes>
      <Route path="/" element={loggedIn ? 
        <Navigate to="/cards" replace /> : 
        <Navigate to="/sign-in" replace />} 
      />
      <Route path="/cards" element={
        <ProtectedRoute 
          loggedIn={loggedIn} 
          element={UserPageWithCards}
        />}
      />
      <Route path="/sign-up" element={<Register loggedIn={loggedIn} onSubmitRegister={onSubmitRegister}/>}/>
      <Route path="/sign-in" element={<Login loggedIn={loggedIn} onSubmitLogin={onSubmitLogin}/>}/>
      
      <Route path="*" element={<div>404 Page Not found</div>}/>
    </Routes>
    
   </> 
  )
}

export default App;
