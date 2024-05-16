/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import { LocalStorage } from "@/utils/LocalStorage"
import { useState } from "react"
import { toast } from "react-toastify"

const useLogin = () => {
  const [loadingLogin, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async ({ username, password }: any) => {
    const success = handleInputValidation({ username, password })
    if (!success) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/signIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      toast.success("Login successfully")
      localStorage.setItem("tokens-user", JSON.stringify(data))
      LocalStorage.setToken(data?.tokens?.accessToken)
      LocalStorage.setRefreshToken(data?.tokens?.refreshToken)

      setAuthUser(data)
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return { login, loadingLogin }
}
export default useLogin
const handleInputValidation = ({ username, password }: { username: string; password: string }) => {
  if (!username || !password) {
    toast.error("All fields are required")
    return false
  }
  // if (username.length < 3) {
  //     toast.error("Username must be at least 3 characters")
  //     return false
  // }
  // if (password.length < 6) {
  //     toast.error("Password must be at least 6 characters")
  //     return false
  // }
  return true
}
