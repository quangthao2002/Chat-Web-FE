import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
        // const { logout } = useLogOut();
    useEffect(() => {
        const getConversations = async() => {
            setLoading(true)
            try {
                const tokensUser = JSON.parse(localStorage.getItem("tokens-user")) // Lấy tokens-user từ localStorage
                const { accessToken, refreshToken } = tokensUser.tokens // lấy accessToken và refreshToken từ tokensUser
                let res = await fetch("http://localhost:3000/user/users-sidebar", {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Gửi accessToken trong header Authorization
                    },
                })
                let data = await res.json()
                if (!res.ok) {
                    if (data.message === "Unauthorized") {
                        // Token hết hạn, làm mới token
                        const refreshRes = await fetch("http://localhost:3000/user/refresh-token", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ refreshToken }), // Gửi refreshToken trong body
                        })
                        const refreshData = await refreshRes.json()

                        if (!refreshRes.ok) {
                            throw new Error(refreshData.message)
                        }
                        // Lưu access token mới vào localStorage
                        localStorage.setItem(
                                "tokens-user",
                                JSON.stringify({...tokensUser, tokens: {...tokensUser.tokens, accessToken: refreshData.accessToken } }),
                            )
                            // Thử lại yêu cầu ban đầu với access token mới
                        res = await fetch("http://localhost:3000/user/users-sidebar", {
                            headers: {
                                Authorization: `Bearer ${refreshData.accessToken}`, // Gửi accessToken mới trong header Authorization
                            },
                        })
                        data = await res.json()
                        if (!res.ok) {
                            throw new Error(data.message)
                        }
                    } else {
                        throw new Error(data.message)
                    }
                }
                setConversation(data)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [])
    const addConversation = (newConversation) => {
        setConversation((prevConversations) => [...prevConversations, newConversation])
    }
    return { loading, conversation, addConversation }
}

export default useGetConversations