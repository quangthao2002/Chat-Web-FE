/* eslint-disable @typescript-eslint/no-explicit-any */
import useGetConversations from "@/hooks/useGetConversations"
import Conversation from "./Conversation"
import { useEffect, useState } from "react"
import { useAuthContext } from "@/context/AuthContext"
import useSocket from "@/zustand/useSocket"
import { useChatbotContext } from "@/context/ConversationChatbotContext"
import ConversationChatbot from "@/components/chatbot/ConversationChatbot"

const SidebarMessage = () => {
  const [userOnline, setUserOnline] = useState(new Map())
  const { loading, conversation } = useGetConversations()
  const { authUser } = useAuthContext()
  const userId = authUser?.user?.id
  const { getSocket } = useSocket(userId)
  const { showConversationChatbot } = useChatbotContext()

  useEffect(() => {
    const socket = getSocket()
    socket?.on("getUsersOnline", (usersOnline: any) => {
      setUserOnline(new Map(usersOnline))
    })
  }, [getSocket])

  return (
    <div className="py-2 flex-1 flex flex-col h-full max-h-screen overflow-auto  ">
      {showConversationChatbot ? (
        <>
          <ConversationChatbot
            conversation={{
              id: "chatbot1",
              name: "Chat bot 1",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyIBpDCSNmMpWNR4mDzuhr46_1AuxzoOJsCakUbH2RQ&s",
            }}
          />
          <ConversationChatbot
            conversation={{
              id: "chatbot2",
              name: "Chat bot 2",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyIBpDCSNmMpWNR4mDzuhr46_1AuxzoOJsCakUbH2RQ&s",
            }}
          />
        </>
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
          {loading ? <span className="loading loading-spinner m-auto"></span> : null}
        </>
      )}
    </div>
  )
}

export default SidebarMessage
