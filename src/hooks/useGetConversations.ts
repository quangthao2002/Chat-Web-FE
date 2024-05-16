/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useGroupStore } from "@/zustand/useGroupStore"
import { useCallback, useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState<any[]>([])
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id ?? null
  const { isAccept, setListFriend } = useFriendStore()
  const { listMember, listAdmin } = useGroupStore()
  const [setRefresh] = useState(false)
  const ownerId = JSON.parse(localStorage.getItem("tokens-user") as any)?.user?.id

  const fetchData = useCallback(async (url: string, accessToken: string, refreshToken: string) => {
    let res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    let data = await res.json()

    if (!res.ok) {
      if (data.message === "Unauthorized") {
        const refreshRes = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/user/refresh-token`, {
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
      const tokensUser = JSON.parse(localStorage.getItem("tokens-user") as any)
      const { accessToken, refreshToken } = tokensUser.tokens

      const data = await fetchData(
        `${import.meta.env.VITE_API_ENDPOINT}/user/get-friends?userId=${userId}`,
        accessToken,
        refreshToken,
      )
      const rooms = await fetchData(
        `${import.meta.env.VITE_API_ENDPOINT}/room/rooms/user/` + ownerId,
        accessToken,
        refreshToken,
      )

      const result = data?.map((item: any) => {
        const isMe = item.sender.id === userId
        return isMe ? item.receiver : item.sender
      })

      setListFriend(result)
      setConversation([...result, ...rooms])
    } catch (error: any) {
      toast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }, [fetchData, userId, ownerId])

  useEffect(() => {
    getConversations()
  }, [isAccept, listMember, listAdmin, getConversations, authUser])

  const addConversation = (newConversation: any) => {
    setConversation((prevConversations) => [...prevConversations, newConversation])
  }

  return { loading, conversation, addConversation, getConversations, setRefresh, setConversation }
}

export default useGetConversations
