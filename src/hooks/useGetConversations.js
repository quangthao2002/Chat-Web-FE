import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
    const [loading, setLoading] = useState(false)
    const [conversation, setConversation] = useState([])
    const [refresh, setRefresh] = useState(false)
    const ownerId = JSON.parse(localStorage.getItem("tokens-user")).user.id
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
                let users = await res.json()
                if (!res.ok) {
                    if (users.message === "Unauthorized") {
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
                        users = await res.json()
                        if (!res.ok) {
                            throw new Error(users.message)
                        }
                    } else {
                        throw new Error(users.message)
                    }
                }

                res = await fetch("http://localhost:3000/room/rooms/user/" + ownerId)
                let rooms = await res.json()

                // if (!res.ok) {
                //     if (rooms.message === "Unauthorized") {
                //         // Token hết hạn, làm mới token
                //         const refreshRes = await fetch("http://localhost:3000/user/refresh-token", {
                //             method: "POST",
                //             headers: {
                //                 "Content-Type": "application/json",
                //             },
                //             body: JSON.stringify({ refreshToken }),
                //         })
                //         const refreshData = await refreshRes.json()

                //         if (!refreshRes.ok) {
                //             throw new Error(refreshData.message)
                //         }
                //         // Lưu access token mới vào localStorage
                //         localStorage.setItem(
                //                 "tokens-user",
                //                 JSON.stringify({...tokensUser, tokens: {...tokensUser.tokens, accessToken: refreshData.accessToken } }),
                //             )
                //             // Thử lại yêu cầu ban đầu với access token mới
                //         res = await fetch("http://localhost:3000/rooms/user/" + ownerId, {
                //             headers: {
                //                 Authorization: `Bearer ${refreshData.accessToken}`,
                //             },
                //         })
                //         rooms = await res.json()


                //         if (!res.ok) {
                //             throw new Error(rooms.message)
                //         }
                //     } else {
                //         throw new Error(rooms.message)
                //     }
                // }
                console.log(rooms, "rooms")
                    // Danh sach nguoi dung va nhom
                const conversation = [...users, ...rooms]
                setConversation(conversation)
            } catch (error) {
                toast.error(error.message)
            } finally {
                setLoading(false)
            }
        }
        getConversations()
    }, [ownerId, refresh])



    return { loading, conversation, setConversation, setRefresh }
}

export default useGetConversations