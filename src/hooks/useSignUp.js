import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react"
import toast from "react-hot-toast"

const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const signUp = async ({ username, fullName, password, email, phone, avatar }) => {
    const success = handleInputValidation({ username, fullName, password, email, phone, avatar })
    if (!success) {
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/signUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, fullName, password, email, phone, avatar, is_admin: false, is_verify: false }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.message)
      }
      toast.success("Please check email to verify account")
      //localStorage

      //context
      setAuthUser(data.user) //để cung cấp thông tin người dùng cho các component khác sử dụng AuthContext
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  return { loading, signUp }
}

export default useSignUp

function handleInputValidation({ username, fullName, password, phone, avatar }) {
  const phoneRegex = /^[0-9]{10,}$/ // bắt đầu từ 0-9, có từ 10 ký tự trở lên

  if (!username || !fullName || !password || !phone) {
    toast.error("All fields are required")
    return false
  }
  if (username.length < 3) {
    toast.error("Username must be at least 3 characters")
    return false
  }
  if (fullName.length < 3) {
    toast.error("Full Name must be at least 3 characters")
    return false
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters")
    return false
  }
  if (!phoneRegex.test(phone)) {
    toast.error("Phone must be a valid number with at least 10 digits")
    return false
  }

  return true
}
