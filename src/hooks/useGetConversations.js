import { useAuthContext } from "@/context/AuthContext"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useGroupStore } from "@/zustand/useGroupStore"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState([])
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id ?? null
  const { isAccept, setListFriend } = useFriendStore()
  const { listMember, listAdmin } = useGroupStore()
  const [setRefresh] = useState(false)
  const ownerId = JSON.parse(localStorage.getItem("tokens-user"))?.user?.id

  const fetchData = useCallback(async (url, accessToken, refreshToken) => {
    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    let data = await res.json()

    if (!res.ok) {
      if (data.message === "Unauthorized") {
        const refreshRes = await fetch("http://localhost:3000/user/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        })
        const refreshData = await refreshRes.json()

        if (!refreshRes.ok) {
          throw new Error(refreshData.message)
        }

        localStorage.setItem("tokens-user", JSON.stringify({ tokens: refreshData }))

        res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${refreshData.accessToken}`,
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

    return data
  }, [])

  const getConversations = useCallback(async () => {
    if (!userId || !ownerId) return

    setLoading(true)
    try {
      const tokensUser = JSON.parse(localStorage.getItem("tokens-user"))
      const { accessToken, refreshToken } = tokensUser.tokens

      const data = await fetchData(`http://localhost:3000/user/get-friends?userId=${userId}`, accessToken, refreshToken)
      const rooms = await fetchData("http://localhost:3000/room/rooms/user/" + ownerId, accessToken, refreshToken)

      const result = data?.map((item) => {
        const isMe = item.sender.id === userId
        return isMe ? item.receiver : item.sender
      })

      setListFriend(result)
      setConversation([...result, ...rooms])
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }, [fetchData, userId, ownerId])

  useEffect(() => {
    getConversations()
  }, [isAccept, listMember, listAdmin, getConversations, authUser])

  const addConversation = (newConversation) => {
    setConversation((prevConversations) => [...prevConversations, newConversation])
  }

  return { loading, conversation, addConversation, getConversations, setRefresh, setConversation }
}

export default useGetConversations
