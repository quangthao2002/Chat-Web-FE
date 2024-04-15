import { useAuthContext } from "@/context/AuthContext"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useGroupStore } from "@/zustand/useGroupStore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState([])
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id ?? null
  const { isAccept } = useFriendStore()
  const [refresh, setRefresh] = useState(false)
  const tokensUser = JSON.parse(localStorage.getItem("tokens-user"))
  const ownerId = tokensUser?.user?.id ?? null
  const getConversations = async () => {
    setLoading(true)
    try {
      const tokensUser = JSON.parse(localStorage.getItem("tokens-user")) // Lấy tokens-user từ localStorage
      const { accessToken, refreshToken } = tokensUser.tokens // lấy accessToken và refreshToken từ tokensUser
      let res = await fetch(`http://localhost:3000/user/get-friends?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Gửi accessToken trong header Authorization
        },
      })
      let data = await res.json()
      res = await fetch("http://localhost:3000/room/rooms/user/" + ownerId)
      let rooms = await res.json()

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
            JSON.stringify({ ...tokensUser, tokens: { ...tokensUser.tokens, accessToken: refreshData.accessToken } }),
          )
          // Thử lại yêu cầu ban đầu với access token mới
          res = await fetch("http://localhost:3000/user/get-friends", {
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
      const result = data?.map((item) => {
        const isMe = item.sender.id === userId
        return isMe ? item.receiver : item.sender
      })

      setConversation([...result, ...rooms])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getConversations()
  }, [isAccept, ownerId, refresh])

  const addConversation = (newConversation) => {
    setConversation((prevConversations) => {
      const updatedConversations = [...prevConversations, newConversation]
      return updatedConversations
    })
  }
  return { loading, conversation, addConversation, getConversations, setRefresh, setConversation }
}

export default useGetConversations
