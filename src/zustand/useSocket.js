import useConversation from "@/zustand/useConversation.js"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"

const useSocket = (userId) => {
  const socketRef = useRef()
  const { setMessages, messages, setIsTyping, setLastMessageSeen, lastMessageSeen } = useConversation()
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

    socketRef.current.on("typing", () => setIsTyping(true))
    socketRef.current.on("stopTyping", () => setIsTyping(false))

    socketRef.current.on("messagesSeen", (message) => {
      console.log("seen", message)
      const updatedMessages = messages.map((msg) => (msg.id === message.id ? { ...msg, seen: true } : msg))
      setMessages(updatedMessages)
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [messages, setIsTyping, setMessages, token])

  useEffect(() => {
    const lastMessage = messages[messages.length - 1]
    const lastMessageIsFromOtherUser = lastMessage?.user?.id !== userId && !lastMessage?.seen // Check if the last message is from the other user and has not been seen

    if (lastMessageIsFromOtherUser) {
      socketRef.current.emit("markAsSeen", lastMessage)
      setLastMessageSeen(lastMessage)
    }
  }, [messages, userId, lastMessageSeen, setLastMessageSeen]) // Dependency array without lastMessageSeen

  const sendMessage = (newMessage) => {
    socketRef.current.emit("message", newMessage)
  }
  const sendTyping = (userId) => {
    socketRef.current.emit("typing", { recipientId: userId })
  }
  const sendStopTyping = (userId) => {
    socketRef.current.emit("stopTyping", { recipientId: userId })
  }

  return { sendMessage, sendTyping, sendStopTyping }
}
export default useSocket
