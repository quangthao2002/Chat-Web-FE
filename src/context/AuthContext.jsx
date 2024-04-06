export const useAuthContext = () => {
  return useContext(AuthContext)
}
import { createContext, useContext, useState } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("tokens-user")) || null
  const [authUser, setAuthUser] = useState(token)

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
