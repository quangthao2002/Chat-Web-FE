import useConversation from "@/zustand/useConversation"
import { useEffect, useState } from "react"

interface ConversationProps {
  conversation: {
    id: string
    username: string
    avatar: string
    name?: string
  }
  lastIndex?: boolean
  usersOnline: Map<string, boolean>
}

const Conversation = ({ conversation, lastIndex, usersOnline }: ConversationProps) => {
  const [time] = useState(new Date())
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?.id === conversation?.id



  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${usersOnline.get(conversation?.id) ? "online" : "offline"} `}>
          <div className="w-12 rounded-full">
            <img src={conversation.avatar} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-3 justify-between">
            <p className="text-lg font-semibold">{conversation.username || conversation.name}</p>
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
