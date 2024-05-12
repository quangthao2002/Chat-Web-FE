import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation.js"
import { useCallback, useEffect, useRef } from "react"
import { io } from "socket.io-client"
import { useFriendStore } from "./useFriendStore"
import { useGroupStore } from "./useGroupStore"
import { useVideoCallStore } from "./useVideoCallStore"

const useSocket = (userId) => {
  const socketRef = useRef()
  const { authUser } = useAuthContext()
  const currentUserId = authUser?.user?.id
  const { setMessages, messages, setIsTyping, setUserOnline, selectedConversation } = useConversation()
  const { setSenderId, setReceiverId, setIsAccept } = useFriendStore()
  const { setCallingUserId, setCalling, setCallInProgress, setCallingUserName, setCallingUserAvatar, setCallEnded } =
    useVideoCallStore()
  const { setListMember, setListAdmin } = useGroupStore()
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
      if (payload.list.includes(userId)) {
        setListMember(payload.list)
      }
    })
    socketRef.current.on("add-members", (payload) => {
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListMember(payload.list)
      }
    })
    socketRef.current.on("delete-members", (payload) => {
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListMember(payload.list)
      }
    })
    socketRef.current.on("add-admins", (payload) => {
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListAdmin(payload.list)
      }
    })
    socketRef.current.on("delete-admins", (payload) => {
      if (payload.list.find((user) => user.id === currentUserId)) {
        setListAdmin(payload.list)
      }
    })

    return () => {
      socketRef.current.off("create-group")
      socketRef.current.off("add-members")
      socketRef.current.off("delete-members")
    }
  }, [currentUserId, setListAdmin, setListMember, userId])

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
    socketRef.current.on("cancel-friend-request", (payload) => {
      setSenderId(payload.senderId)
      setReceiverId(payload.receiverId)
    })
    socketRef.current.on("delete-friend-request", (payload) => {
      setSenderId(payload.senderId)
      setReceiverId(payload.receiverId)
    })
    return () => {
      socketRef.current.off("friend-request-sent")
      socketRef.current.off("accept-friend-request")
      socketRef.current.off("delete-friend-request")
      socketRef.current.off("cancel-friend-request")
    }
  }, [setIsAccept, setReceiverId, setSenderId, userId])

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

  useEffect(() => {
    const handleCallMade = (data) => {
      setCalling(true)
      setCallingUserId(data.from)
      setCallingUserName(data.name)
      setCallingUserAvatar(data.avatar)
    }

    socketRef.current.on("call-made", handleCallMade)

    return () => {
      socketRef.current.off("call-made", handleCallMade)
    }
  }, [setCalling, setCallingUserId])

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

  const answerCall = async (id) => {
    socketRef.current.emit("answer-call", { from: id, to: userId })
  }

  const callUser = async (id) => {
    socketRef.current.emit("call-user", {
      from: userId,
      to: id,
      name: authUser?.user?.username,
      avatar: authUser?.user?.avatar,
    })
  }

  const leaveCall = () => {
    setCallEnded(true)
    setCallInProgress(false)
    setCalling(false)
  }

  const joinRoom = (data) => {
    socketRef.current.emit("join-room", data)
  }

  return {
    sendMessage,
    sendTyping,
    sendStopTyping,
    getSocket,
    sendGroupMessage,
    callUser,
    joinRoom,
    answerCall,
    leaveCall,
  }
}
export default useSocket
