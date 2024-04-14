import useConversation from "@/zustand/useConversation.js"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useFriendStore } from "./useFriendStore"
import useGetConversations from "@/hooks/useGetConversations"
import { toast } from "react-toastify"
import { useGroupStore } from "./useGroupStore"
const useSocket = (userId) => {
  const socketRef = useRef()
  const { setMessages, messages, setIsTyping, setUserOnline, selectedConversation } = useConversation()
  const { setSenderId, setReceiverId, setIsAccept } = useFriendStore()
  const { setListMember } = useGroupStore()
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user.tokens.accessToken

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      query: {
        token: token,
      },
    })
    socketRef.current.on("getUsersOnline", (data) => {
      const usersOnlineMap = new Map(data)
      setUserOnline(usersOnlineMap)
    })

    return () => {
      socketRef.current.off("getUsersOnline")
      socketRef.current.disconnect()
    }
  }, [setIsTyping, setUserOnline, token])

  useEffect(() => {
    socketRef.current.on("friend-request-sent", (payload) => {
      setSenderId(payload.senderId)
      setReceiverId(payload.receiverId)
    })
    socketRef.current.on("accept-friend-request", (payload) => {
      setIsAccept(true)
    })
    return () => {
      socketRef.current.off("friend-request-sent")
      socketRef.current.off("accept-friend-request")
    }
  }, [])

  useEffect(() => {
    if (selectedConversation?.ownerId) {
      socketRef.current.emit("join", { roomId: selectedConversation?.id })
    }
    return () => {
      socketRef.current.off("join")
      socketRef.current.emit("leave", { roomId: selectedConversation?.id })
    }
  }, [selectedConversation])

  useEffect(() => {
    socketRef.current.on("message", (newMessage) => {
      if (!selectedConversation?.ownerId) {
        setMessages([...messages, newMessage])
      }
    })

    socketRef.current.on("deleteMessage", (deletedMessage) => {
      const index = messages.findIndex((item) => item?.id === deletedMessage?.id)
      if (index !== -1) {
        messages[index] = { ...messages[index], ...deletedMessage }
        setMessages(messages)
      } else {
        console.error(`Item with ID ${deletedMessage?.id} not found`)
      }
    })

    socketRef.current.on("unsendmessage", (unsendMessage) => {
      // Find the index of the item in the array based on its ID
      const index = messages.findIndex((item) => item?.id === unsendMessage?.id)
      // If item is found
      if (index !== -1) {
        // Update the item with the new data
        messages[index] = { ...messages[index], ...unsendMessage }

        setMessages(messages)
      } else {
        console.error(`Item with ID ${unsendMessage?.id} not found`)
      }
    })
    return () => {
      socketRef.current.off("unsendmessage")
      socketRef.current.off("deleteMessage")
      socketRef.current.off("message")
    }
  }, [messages, setMessages])

  useEffect(() => {
    socketRef.current.on("group-message", (newMessage) => {
      if (!messages.find((message) => message.id === newMessage.id)) {
        setMessages([...messages, newMessage])
      }
    })

    return () => {
      socketRef.current.off("group-message")
    }
  }, [messages, setMessages])

  useEffect(() => {
    socketRef.current.on("typing", () => setIsTyping(true))
    socketRef.current.on("stopTyping", () => setIsTyping(false))
    return () => {
      socketRef.current.off("stopTyping")
      socketRef.current.off("typing")
    }
  }, [setIsTyping])

  const sendMessage = (newMessage) => {
    socketRef.current.emit("message", newMessage)
  }
  const sendTyping = (userId) => {
    socketRef.current.emit("typing", { recipientId: userId })
  }
  const sendStopTyping = (userId) => {
    socketRef.current.emit("stopTyping", { recipientId: userId })
  }
  const getSocket = () => {
    return socketRef.current
  }
  const sendGroupMessage = (newMessage) => {
    socketRef.current.emit("group-message", newMessage)
  }
  return { sendMessage, sendTyping, sendStopTyping, getSocket, sendGroupMessage }
}
export default useSocket
