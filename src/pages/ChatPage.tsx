import Chat from "@/components/chat"
import Header from "@/components/header/HeaderMessage"
import MessageContainer from "@/components/message/MessageContainer"
import useConversation from "@/zustand/useConversation"
import { useEffect } from "react"
import { NoChatSelected } from "./NoChatSelected"
import Chatbot from "@/components/chatbot/Chatbot"

const ChatPage = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])

  return (
    <div className="flex flex-col flex-1">
      {!selectedConversation ? (
       <>
         <NoChatSelected />
        <Chatbot />
       </>
      ) : (
        <>
          <div className="md:min-w-[450px] flex flex-col flex-1">
            <Header />
            <MessageContainer />
            <Chat />
          </div>
        </>
      )}
    </div>
  )
}

export default ChatPage
