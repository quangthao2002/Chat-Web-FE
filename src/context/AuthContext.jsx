import { createContext, useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

export const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }) => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const accessToken = query.get("token")

  const tokens_user = JSON.parse(localStorage.getItem("tokens-user")) || null
  const [authUser, setAuthUser] = useState(tokens_user)

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("tokens-user", JSON.stringify({ tokens: { accessToken } }))
      setAuthUser(accessToken)
    }
  }, [accessToken])

  return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>
}
