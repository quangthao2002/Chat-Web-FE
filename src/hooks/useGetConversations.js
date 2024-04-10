import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const useGetConversations = () => {
  const [loading, setLoading] = useState(false)
  const [conversation, setConversation] = useState([])

  useEffect(() => {
    const ownerId = JSON.parse(localStorage.getItem("tokens-user")).user.id

    const getConversations = async () => {
      setLoading(true)
      try {
        const tokensUser = JSON.parse(localStorage.getItem("tokens-user"))
        const { accessToken, refreshToken } = tokensUser.tokens

        let res = await fetch("http://localhost:3000/user/users-sidebar", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        let users = await res.json()

        if (!res.ok) {
          if (users.message === "Unauthorized") {
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

            localStorage.setItem(
              "tokens-user",
              JSON.stringify({ ...tokensUser, tokens: { ...tokensUser.tokens, accessToken: refreshData.accessToken } }),
            )

            res = await fetch("http://localhost:3000/user/users-sidebar", {
              headers: {
                Authorization: `Bearer ${refreshData.accessToken}`,
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

        res = await fetch(`http://localhost:3000/room/rooms/user/${ownerId}`)
        let rooms = await res.json()

        if (!res.ok) {
          throw new Error(rooms.message)
        }

        const conversations = [...users, ...rooms]
        setConversation(conversations)
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
