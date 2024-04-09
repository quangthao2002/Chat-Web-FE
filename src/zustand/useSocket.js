import useConversation from "@/zustand/useConversation.js"
import { useEffect, useRef } from "react"
import { io } from "socket.io-client"

const useSocket = (userId) => {
  const socketRef = useRef()
  const { setMessages, messages, setIsTyping, setLastMessageSeen, lastMessageSeen, setUserOnline, usersOnline } =
  useConversation()
  const user = JSON.parse(localStorage.getItem("tokens-user"))
  const token = user.tokens.accessToken

  useEffect(() => {
    socketRef.current = io("http://localhost:3000", {
      query: {
        token: token,
      },
    })

    socketRef.current.on("message", (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage])
    })
    socketRef.current.on("message", (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage])
    })


    socketRef.current.on("deleteMessage", (deletedMessage) => {
      // Find the index of the item in the array based on its ID
      const index = messages.findIndex(item => item?.id === deletedMessage?.id);
       console.log("dleete",index)
      // If item is found
      if (index !== -1) {
        // Update the item with the new data
        messages[index] = { ...messages[index], ...deletedMessage };
        console.log(messages[index]);
        setMessages(messages)
      } else {
        console.error(`Item with ID ${deletedMessage?.id} not found`);
      }
    })
  
    socketRef.current.on("unsendmessage", (unsendMessage) => {
      // Find the index of the item in the array based on its ID
      const index = messages.findIndex(item => item?.id === unsendMessage?.id);

      // If item is found
      if (index !== -1) {
        // Update the item with the new data
        messages[index] = { ...messages[index], ...unsendMessage };
        console.log(messages[index]);
        setMessages(messages)
      } else {
        console.error(`Item with ID ${unsendMessage?.id} not found`);
      }
    })

    socketRef.current.on("typing", () => setIsTyping(true))
    socketRef.current.on("stopTyping", () => setIsTyping(false))

    socketRef.current.on("getUsersOnline", (data) => {
      // Extract the user IDs from the received data and create a Map
      const usersOnlineMap = new Map(data)
      // Update the userOnline state with the Map
      setUserOnline(usersOnlineMap)
    })
    return () => {
      socketRef.current.off("message")
      socketRef.current.off("getUsersOnline")
      socketRef.current.off("unsendmessage")
      socketRef.current.off("deleteMessage")
      socketRef.current.disconnect()

    }
  }, [messages, setIsTyping, setMessages, token])

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
