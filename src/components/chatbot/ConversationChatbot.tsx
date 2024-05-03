import useConversation from "@/zustand/useConversation"
import {  useState } from "react"

interface ConversationProps {
  conversation: {
    id: string
    // username: string
    avatar: string
    name?: string
  }
}

const ConversationChatbot = ({ conversation }: ConversationProps) => {
  const [time] = useState(new Date())
  const { selectedConversationChatbot, setSelectedConversationChatbot } = useConversation()
  const isSelected = selectedConversationChatbot?.id === conversation?.id

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversationChatbot(conversation)}
      >
        <div className={`avatar`}>
          <div className="w-12 rounded-full">
            <img src={conversation.avatar} alt={conversation.name} className="rounded-full w-12 h-12" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-3 justify-between">
            <p className="text-lg font-semibold">{conversation.name}</p>
            <span className="text-xs  text-gray-400">
              {time.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 mx-1 h-1 " />
    </>
  )
}

export default ConversationChatbot
