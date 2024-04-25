import useConversation from "@/zustand/useConversation.js"
import { useCallback, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useFriendStore } from "./useFriendStore"
import { useGroupStore } from "./useGroupStore"
import { useAuthContext } from "@/context/AuthContext"

const useSocket = (userId) => {
  const socketRef = useRef()
  const { authUser } = useAuthContext()
  const currentUserId = authUser?.user?.id
  const { setMessages, messages, setIsTyping, setUserOnline, selectedConversation } = useConversation()
  const { setSenderId, setReceiverId, setIsAccept } = useFriendStore()
  const { setListMember } = useGroupStore()
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user?.tokens?.accessToken

  const updateMessage = useCallback((updatedMessage) => {
    setMessages((prevMessages) => {
      const index = prevMessages.findIndex((item) => item?.id === updatedMessage?.id)
      if (index !== -1) {
        const updatedMessages = [...prevMessages]
        updatedMessages[index] = { ...updatedMessages[index], ...updatedMessage }
        return updatedMessages
      } else {
        console.error(`Item with ID ${updatedMessage?.id} not found`)
        return prevMessages
      }
    })
  }, [])

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
    socketRef.current.on("create-group", (payload) => {
      console.log("create-group", payload.list, userId)
      if (payload.list.includes(userId)) {
        setListMember(payload.list)
      }
    })
    socketRef.current.on("add-members", (payload) => {
      console.log("add-members", payload.list, userId)
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListMember(payload.list)
      }
    })
    socketRef.current.on("delete-members", (payload) => {
      console.log("delete-members", payload.list, userId)
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListMember(payload.list)
      }
    })

    return () => {
      socketRef.current.off("create-group")
      socketRef.current.off("add-members")
      socketRef.current.off("delete-members")
    }
  }, [])

  useEffect(() => {
    socketRef.current.on("friend-request-sent", (payload) => {
      setSenderId(payload.senderId)
      setReceiverId(payload.receiverId)
    })
    socketRef.current.on("accept-friend-request", (payload) => {
      if (payload.senderId === userId || payload.receiverId === userId) {
        setIsAccept(true)
      }
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

    socketRef.current.on("deleteMessage", updateMessage)
    socketRef.current.on("unsendmessage", updateMessage)

    return () => {
      socketRef.current.off("unsendmessage")
      socketRef.current.off("deleteMessage")
      socketRef.current.off("message")
    }
  }, [updateMessage])

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
