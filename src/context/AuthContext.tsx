/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react"

interface AuthContextType {
  authUser: any
  setAuthUser: (user: any) => void
}

export const AuthContext = createContext({} as AuthContextType)

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const token = JSON.parse(localStorage.getItem("tokens-user") as string) || null
  const [authUser, setAuthUser] = useState(token)

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
