/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"
import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import useSocket from "@/zustand/useSocket"
import Chatbot2 from "@/components/chatbot/Chatbot2"
import { useChatbotContext } from "@/context/ChatbotContext"

const SidebarMessage = () => {
  const [userOnline, setUserOnline] = useState(new Map())
  const { loading, conversation } = useGetConversations()
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { getSocket } = useSocket(userId)
  const { showChatbot } = useChatbotContext()

  useEffect(() => {
    const socket = getSocket()
    socket?.on("getUsersOnline", (usersOnline: any) => {
      setUserOnline(new Map(usersOnline))
    })
  }, [getSocket])

  return (
    <div className="py-2 flex-1 flex flex-col h-full max-h-screen overflow-auto  ">
      {showChatbot ? (
        <Chatbot2 />
      ) : (
        <>
          {conversation?.map((user: any, index: number) => (
            <Conversation
              key={user?.id}
              conversation={user}
              usersOnline={userOnline}
              lastIndex={index === conversation.length - 1}
            />
          ))}
          {loading ? <span className="loading loading-spinner"></span> : null}
        </>
      )}
    </div>
  )
}

export default SidebarMessage
