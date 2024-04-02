import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("tokens-user")) || null
  const [authUser, setAuthUser] = useState(token)

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
