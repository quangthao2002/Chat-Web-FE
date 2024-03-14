import { useEffect, useState } from "react"
import io, { Socket } from "socket.io-client"
import { SOCKET_CONSTANTS, SOCKET_URL } from "../../lib/constants.js"
import ChatInput from "../chat/ChatInput.js"
import Message from "./Message.jsx"

const Messages = () => {
  const [socket, setSocket] = useState<Socket>()
  const [messages, setMessages] = useState<string[]>([])

  const handleSend = (value: string) => {
    console.log(value)
    socket?.emit(SOCKET_CONSTANTS.message, value)
  }
  const messageListener = (message: string) => {
    setMessages([...messages, message])

    console.log(messages)
  }

  useEffect(() => {
    const newSocket = io(SOCKET_URL)
    setSocket(newSocket)
  }, [setSocket])

  useEffect(() => {
    socket?.on(SOCKET_CONSTANTS.message, messageListener)
    return () => {
      socket?.off(SOCKET_CONSTANTS.message, messageListener)
    }
  }, [socket])

  return (
    <div className="px-4 flex-1 overflow-auto">
      {messages.map((_, index) => (
        <Message key={index} name="Quang Thảo" time={"12:45"} message="Hi" isMe />
      ))}

      <ChatInput handleSend={handleSend} />
    </div>
  )
}

export default Messages
