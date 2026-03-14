import React, { createContext, useEffect } from 'react'
import { useState } from 'react'


 export const AuthContext =  createContext()





function AuthContextProvider({children}) {

const [ token, setToken ] =useState(null)

   
    useEffect(function(){



        if (localStorage.getItem("Token") != null){

            setToken(localStorage.getItem("Token"))
        }
        
    } ,[])
    
  return (
    <AuthContext.Provider value ={

{

    token ,
    setToken
}

    }>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
