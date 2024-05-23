/* eslint-disable @typescript-eslint/no-explicit-any */
import ConversationChatbot from "@/components/chatbot/ConversationChatbot"
import { useChatbotContext } from "@/context/ConversationChatbotContext"
import useGetConversations from "@/hooks/useGetConversations"
import { useState } from "react"
import Conversation from "./Conversation"

const SidebarMessage = () => {
  const [userOnline] = useState(new Map())
  const { loading, conversation } = useGetConversations()
  const { showConversationChatbot } = useChatbotContext()

  // useEffect(() => {
  //   const socket = getSocket()
  //   socket?.on("getUsersOnline", (usersOnline: any) => {
  //     setUserOnline(new Map(usersOnline))
  //   })
  // }, [getSocket])

  return (
    <div className="py-2 flex-1 flex flex-col h-full max-h-screen overflow-auto  ">
      {showConversationChatbot ? (
        <>
          <ConversationChatbot
            conversation={{
              id: "chatbot1",
              name: "Kaka bot",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyIBpDCSNmMpWNR4mDzuhr46_1AuxzoOJsCakUbH2RQ&s",
            }}
          />
          <ConversationChatbot
            conversation={{
              id: "chatbot2",
              name: "Depilot",
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
