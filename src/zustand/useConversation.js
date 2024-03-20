import { create } from "zustand"

// global state cua cuoc hoi thoai
// cap nhat trang thai cua cuoc hoi thoai
const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
    // setMessages: (recipientId, fn) => set((state) => ({
    //     messages: {
    //         ...state.messages,
    //         [recipientId]: fn(state.messages[recipientId] || [])
    //     }
    // })),
}))

export default useConversation