import Chat from "@/components/chat"
import Header from "@/components/header/HeaderMessage"
import MessageContainer from "@/components/message/MessageContainer"
import useConversation from "@/zustand/useConversation"
import { useEffect } from "react"
import { NoChatSelected } from "./NoChatSelected"
import Chatbot1 from "@/components/chatbot/Chatbot1"
import Chatbot2 from "@/components/chatbot/Chatbot2"

const ChatPage = () => {
  const { selectedConversation, selectedChatbotId, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => {
      setSelectedConversation(null)
    }
  }, [setSelectedConversation])
  
  return (
    <div className="flex flex-col flex-1">
      {!selectedConversation && !selectedChatbotId ? (
        <NoChatSelected />
      ) : (
        <div className="md:min-w-[450px] flex flex-col flex-1">
          {selectedChatbotId === "chatbot1" ? (
            <Chatbot1 />
          ) : selectedChatbotId === "chatbot2" ? (
            <Chatbot2 />
          ) : (
            <>
              <Header />
              <MessageContainer />
              <Chat />
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatPage