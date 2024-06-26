import { create } from "zustand"

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (messages) => set({ messages }),

  isTyping: true,
  setIsTyping: (isTyping) => set({ isTyping }),
}))

export default useConversation
