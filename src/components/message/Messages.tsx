import Message from "./Message.jsx"
import useGetMessages from "@/hooks/useGetMessages.js"
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx"
import { useEffect, useRef } from "react"

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const lastMessage = useRef()


  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }, [messages])
  
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message,index) => (
          <div key={index} ref={index === messages.length - 1 ? lastMessage : null}>
            <Message message={message} />
          </div>
        ))}

      {loading && [1, 2, 3, 4].map((i) => <MessageSkeleton key={i} />)}

    </div>
  )
}

export default Messages
