import useConversation from "@/zustand/useConversation.js"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"

const useSocket = (userId) => {
  const socketRef = useRef()
  const { setMessages, messages } = useConversation()
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user.tokens.accessToken

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      query: {
        token: token,
      },
    })

    socketRef.current.on("message", (newMessage) => {
      setMessages([...messages, newMessage])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [userId, messages])

  const sendMessage = (newMessage) => {
    socketRef.current.emit("message", newMessage)
  }

  return { sendMessage }
}
export default useSocket
