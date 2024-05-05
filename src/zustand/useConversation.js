import { create } from "zustand"

// global state cua cuoc hoi thoai
// cap nhat trang thai cua cuoc hoi thoai
const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  selectedConversationChatbot: null,
  setSelectedConversationChatbot: (selectedConversationChatbot) => set({ selectedConversationChatbot }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  messagesChatbot: {},
  setMessagesChatbot: (chatbotId, newMessage) => set((state) => ({
    messagesChatbot: {
      ...state.messagesChatbot,
      [chatbotId]: [...(state.messagesChatbot[chatbotId] || []), newMessage],
    },
  })),
  isTyping: false,
  setIsTyping: (isTyping) => set({ isTyping }),

  usersOnline: new Map(),
  setUserOnline: (usersOnline) => set({ usersOnline }),
}))

export default useConversation
