import React from "react";
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import UserPageWithCards from "./pages/UserPageWithCard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import { register, login, checkToken } from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [regedIn, setRegedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const navigate = useNavigate();
 
  function tokenCheck() {
    if(localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      checkToken(jwt)
        .then((res)=>{
          const userEmail = res.data.email;
          setLoggedIn(true);
          setUserEmail(userEmail);
          navigate ('/', {replace: true})
        })
        .catch(()=>{
          localStorage.removeItem('token');
          setLoggedIn(false);
        })
    }
  }
  
  React.useEffect(()=> {tokenCheck()}, [])

  function onSubmitRegister(values, setIsPopupOpen) {
    register(values)
    .then(()=> {setRegedIn(true)})
    .catch(()=>setRegedIn(false))
    .finally(()=>setIsPopupOpen(true))
  }

  function onSubmitLogin(values) {
    login(values)
    .then(()=>{
      setLoggedIn(true);
      setUserEmail(values.email);
      navigate ('/', {replace: true})
    }) 
  }

  function signOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/sign-in', {replace: true})
  }
  return (
   <>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute 
          element={UserPageWithCards}
          loggedIn={loggedIn} 
          userEmail={userEmail}
          onClick={signOut}
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
