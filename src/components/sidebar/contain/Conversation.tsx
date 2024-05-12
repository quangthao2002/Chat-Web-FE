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

  useEffect(() => {
    if (isSelected) {
      setSelectedConversation(conversation)
    }
  }, [conversation, isSelected])

  return (
    <>
      <button
        type="button"
        className={`flex gap-2 items-center group rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-slate-200" : "hover:bg-slate-200"}`}
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
            <span className="text-xs group-hover:text-black text-gray-400">
              {time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </button>

      {!lastIndex && <div className="divider my-0 py-0 mx-1 h-1 " />}
    </>
  )
}

export default Conversation
