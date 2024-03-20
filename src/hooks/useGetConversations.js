import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import useLogOut from "./useLogOut"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
    const { logout } = useLogOut();
    useEffect(() => {
        const getConversations = async() => {
            setLoading(true)
            try {
                const tokensUser = JSON.parse(localStorage.getItem("tokens-user")) // Lấy tokens-user từ localStorage
                const { accessToken } = tokensUser.tokens // lấy accessToken từ tokensUser
                const res = await fetch("http://localhost:3000/user/users-sidebar", {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`, // Gửi accessToken trong header Authorization
                    },
                })
                const data = await res.json()
                if (!res.ok) {
                    if (data.message === 'Token expired') {
                        // Token hết hạn, đăng xuất người dùng
                        logout(); // Thay 'logoutUser' bằng hàm đăng xuất của bạn
                    }
                    throw new Error(data.message)
                }
                setConversation(data)
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])

    // useEffect(()=>{
    //     const getConversations = async()=>{
    //         setLoading(true)
    //         try {
    //             const
    //         } catch (error) {

    //         }
    //     }
    // })
    return { loading, conversation }
}

export default useGetConversations