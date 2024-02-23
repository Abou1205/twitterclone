import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase/config";

const ProtectedRoute = () => {

const [isAuth,setIsAuth] = useState(null)

  useEffect(() => {
    // in real time monitors the user's session
    // any changes update the state
    const unsub = onAuthStateChanged(auth, (user) => {
      if(user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
    // if user leave remove
    return () => unsub()
    
  }, []);

  // if you do not have permission
  if(isAuth === false) return <Navigate to={"/"} />

  // if you have permission
  return <Outlet />
};

export default ProtectedRoute;
