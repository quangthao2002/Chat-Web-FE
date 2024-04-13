import { useAuthContext } from "@/context/AuthContext"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useGroupStore } from "@/zustand/useGroupStore"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState([])
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { isAccept } = useFriendStore()
  const { listMember } = useGroupStore()
  const [refresh, setRefresh] = useState(false)
  const ownerId = JSON.parse(localStorage.getItem("tokens-user"))?.user?.id

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
  }, [isAccept, listMember])

  const addConversation = (newConversation) => {
    console.log(newConversation)
    setConversation((prevConversations) => {
      console.log("prevConversation", prevConversations)

      const updatedConversations = [...prevConversations, newConversation]
      console.log("updateConversation", updatedConversations)
      return updatedConversations
    })
  }
  return { loading, conversation, addConversation, getConversations, setRefresh, setConversation }
}

export default useGetConversations
