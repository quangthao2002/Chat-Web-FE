/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand"

type ConversationState = {
  selectedConversation: any
  setSelectedConversation: (selectedConversation: any) => void
  selectedConversationChatbot: any
  setSelectedConversationChatbot: (selectedConversationChatbot: any) => void
  selectedChatbotId: any
  setSelectedChatbotId: (selectedChatbotId: any) => void
  messages: any[]
  setMessages: (messages: any[]) => void
  messagesChatbot: any
  setMessagesChatbot: (chatbotId: any, newMessage: any) => void
  isTyping: boolean
  setIsTyping: (isTyping: boolean) => void

  usersOnline: Map<any, any>
  setUserOnline: (usersOnline: Map<any, any>) => void
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  selectedConversationChatbot: null,
  setSelectedConversationChatbot: (selectedConversationChatbot) => set({ selectedConversationChatbot }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  messagesChatbot: {},
  setMessagesChatbot: (chatbotId, newMessage) =>
    set((state) => ({
      messagesChatbot: {
        ...state.messagesChatbot,
        [chatbotId]: [...(state.messagesChatbot[chatbotId] || []), newMessage],
      },
    })),
    selectedChatbotId: null,
setSelectedChatbotId: (selectedChatbotId) => set({ selectedChatbotId }),
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),

  usersOnline: new Map(),
  setUserOnline: (usersOnline) => set({ usersOnline }),
}))

export default useConversation
