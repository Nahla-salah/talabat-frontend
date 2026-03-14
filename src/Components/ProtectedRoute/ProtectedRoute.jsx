import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

if (localStorage.getItem("Token") == null) 

  return <Navigate to="/login"></Navigate>

  return (
    <div>
      {children}
    </div>
  )
}

export default ProtectedRoute
