import { useEffect, useState } from "react"
import axios from "axios"
import useConversation from "@/zustand/useConversation"
import toast from "react-hot-toast"

const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()
  const userId = JSON.parse(localStorage.getItem("tokens-user")).user.id
  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        let response
        if (selectedConversation?.ownerId) {
          console.log("room", selectedConversation?.id)
          response = await axios.get(`http://localhost:3000/messages/room/${selectedConversation?.id}`)
        } else {
          response = await axios.get(`http://localhost:3000/messages/${userId}/${selectedConversation?.id}`)
        }
        if (Array.isArray(response.data)) {
          setMessages(response.data)
        } else {
          console.error("Invalid data from API:", response.data)
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
        toast.error(error.message)
      } finally {
        setLoading(false) // Set loading state to false after API request completes
      }
    }

    if (selectedConversation.id) {
      getMessages()
    }
  }, [userId, selectedConversation.id, setMessages]) // Include 'recipientId' in the dependency array

  return { loading, messages }
}

export default useGetMessages
