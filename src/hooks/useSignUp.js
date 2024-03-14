import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react"
import toast from "react-hot-toast"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const signUp = async({ username, fullName, password, phone, age, avatar, is_admin }) => {
        const success = handleInputValidation({ username, fullName, password, phone, age, avatar })
        if (!success) {
            return
        }
        setLoading(true)
        try {
            const res = await fetch("http://localhost:3000/auth/signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, fullName, password, phone, age, avatar, is_admin }),
            })
            const data = await res.json();
            console.log(data)
            if (!res.ok) {
                throw new Error(data.message)
            }
            toast.success("Sign up successfully")
                //localStorage
                // localStorage.setItem("chat-user", JSON.stringify(data.user)) // lưu trữ thông tin người dùng giữa các phiên làm việc
            localStorage.setItem("tokens-user", JSON.stringify(data)) // lưu trữ thông tin người dùng giữa các phiên làm việc

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

function handleInputValidation({ username, fullName, password, phone, age, avatar }) {
    const phoneRegex = /^[0-9]{10,}$/ // bắt đầu từ 0-9, có từ 10 ký tự trở lên

    if (!username || !fullName || !password || !phone || !age || !avatar) {
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
    if (isNaN(age) || age < 18) {
        toast.error("Age must be a number and at least 18")
        return false
    }
    if (!avatar) {
        toast.error("Avatar is required")
        return false
    }
    return true
}