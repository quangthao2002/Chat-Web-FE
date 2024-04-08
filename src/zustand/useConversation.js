import { create } from "zustand"

// global state cua cuoc hoi thoai
// cap nhat trang thai cua cuoc hoi thoai
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),

  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),

  lastMessage: "",
  setLastMessage: (lastMessage) => set({ lastMessage }),

  usersOnline: new Map(),
  setUserOnline: (usersOnline) => set({ usersOnline }),
}))

export default useConversation
