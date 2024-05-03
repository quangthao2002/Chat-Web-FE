// ChatbotContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [showConversationChatbot, setShowConversationChatbot] = useState(false);

  return (
    <ChatbotContext.Provider value={{ showConversationChatbot, setShowConversationChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => useContext(ChatbotContext);