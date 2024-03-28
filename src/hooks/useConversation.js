import { create } from "zustand"

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  createGroup: async (groupName, selectedUsers) => {
    try {
      const response = await fetch('http://localhost:3000/room/createRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ownerId: groupName, // replace with the actual owner ID
          selectedUsers,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const data = await response.json();
      console.log('Group created with ID:', data.roomId);
      return data.roomId;
    } catch (error) {
      console.error('Failed to create group:', error);
    }
  },
}));

export default useConversation;