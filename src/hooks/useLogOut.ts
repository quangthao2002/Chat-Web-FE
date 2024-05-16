import { useAuthContext } from "@/context/AuthContext"
import { useState } from "react"

const useLogOut = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async() => {
        setLoading(true)
        try {
            localStorage.removeItem("tokens-user")
            setAuthUser(null)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}

export default useLogOut