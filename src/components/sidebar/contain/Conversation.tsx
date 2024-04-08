import useConversation from "@/zustand/useConversation"
import axios from "axios"
import { useEffect, useState } from "react"


interface ConversationProps {
  conversation: {
    id: string
    username: string
    avatar: string
  }
  lastIndex?: boolean
}

const Conversation = ({ conversation, lastIndex,isOnline }: ConversationProps) => {
  const [time, setTime] = useState(new Date())
  const { selectedConversation, setSelectedConversation, lastMessage, setLastMessage } = useConversation()

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])


  const { selectedConversation, setSelectedConversation } = useConversation()

  const isSelected = selectedConversation?.id === conversation.id
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >

        <div className={`avatar ${isOnline ? "online" : "offline"}`}>

          <div className="w-12 rounded-full">
            <img src={conversation.avatar} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-3 justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{conversation.username}</p>
              <p className="text-sm">{lastMessage}</p>
            </div>
            <span className="text-xs  text-gray-400">
              {time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      {!lastIndex && <div className="divider my-0 py-0 mx-1 h-1 " />}
    </>
  )
}

export default Conversation
