import React, { createContext, useState, useContext } from "react"

interface ChatbotContextType {
  showConversationChatbot: boolean
  setShowConversationChatbot: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatbotContext = createContext({} as ChatbotContextType)
export const useChatbotContext = () => useContext(ChatbotContext)

export const ChatbotProvider = ({ children }: { children: React.ReactNode }) => {
  const [showConversationChatbot, setShowConversationChatbot] = useState(false)

  return (
    <ChatbotContext.Provider value={{ showConversationChatbot, setShowConversationChatbot }}>
      {children}
    </ChatbotContext.Provider>
  )
}
