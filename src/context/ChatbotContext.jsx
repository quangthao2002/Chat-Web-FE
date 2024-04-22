// ChatbotContext.js
import React, { createContext, useState, useContext } from 'react';

const ChatbotContext = createContext();

export const ChatbotProvider = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <ChatbotContext.Provider value={{ showChatbot, setShowChatbot }}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbotContext = () => useContext(ChatbotContext);