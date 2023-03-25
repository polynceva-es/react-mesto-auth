import React from "react";
import { Routes, Route, Navigate} from "react-router-dom";
import UserPageWithCards from "./pages/UserPageWithCard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [regedIn, setRegedIn] = React.useState(false);
  
  function onSubmitRegister(values, setIsPopupOpen) {
    register(values)
    .then(res=> {
        setRegedIn(true);
    })
    .catch(setRegedIn(false))
    .finally(setIsPopupOpen(true))
  }

  function onSubmitLogin(values) {
    login(values)    
    .then(res=> {checkToken(res.token)});
    // navigate to='/cards'
  }

  return (
   <>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute 
          loggedIn={loggedIn} 
          element={UserPageWithCards}
        />}
      />
      <Route path="/sign-up" element={<Register regedIn={regedIn} loggedIn={loggedIn} onSubmitRegister={onSubmitRegister}/>}/>
      <Route path="/sign-in" element={<Login loggedIn={loggedIn} onSubmitLogin={onSubmitLogin}/>}/>
      <Route path="*" element={<div>404 Page Not found</div>}/>
    </Routes>
    
   </> 
  )
}

export default App;
