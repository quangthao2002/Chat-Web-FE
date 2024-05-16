/* eslint-disable @typescript-eslint/no-explicit-any */
import Message from "./Message.jsx"
import useGetMessages from "@/hooks/useGetMessages.js"
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx"
import { useEffect, useRef } from "react"

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const lastMessage = useRef<any>()

  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current?.scrollIntoView({ behavior: "smooth" })
      }
    }, 500)
  }, [messages])

  return (
    <div className="px-4 flex-1 mb-4">
      {!loading &&
        Array.isArray(messages) &&
        messages.map((message, index) => {
          return (
            <div key={index} ref={index === messages.length - 1 ? lastMessage : null}>
              <Message message={message} isLastMessage={index === messages.length - 1 ? true : false} />
            </div>
          )
        })}

      {loading && [1, 2, 3, 4].map((i) => <MessageSkeleton key={i} />)}
    </div>
  )
}

export default Messages
