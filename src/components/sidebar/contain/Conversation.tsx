import useConversation from "@/zustand/useConversation"
import { useEffect, useState } from "react"

interface ConversationProps {
  conversation: {
    id: string
    username: string
    avatar: string
  }
  lastIndex?: boolean
}

const Conversation = ({ conversation, lastIndex }: ConversationProps) => {
  const [time, setTime] = useState(new Date())

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
        <div className="avatar online">
          <div className="w-16 rounded-full">
            {/* <img src={conversation.avatar} alt="user avatar" /> */}

            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex gap-3 justify-between">
            <p className="text-lg font-semibold">{conversation.username}</p>
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
