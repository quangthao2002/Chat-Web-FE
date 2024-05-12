import { ReceiverStatusRequest, SenderStatusRequest, User } from "@/types/user"
import { create } from "zustand"

type FriendState = {
  senderId: string
  receiverId: string
  isAccept: boolean
  listFriend: User[] | []
  listPendingRequest: SenderStatusRequest[] | []
  listPendingSended: ReceiverStatusRequest[] | []

  setSenderId: (senderId: string) => void
  setReceiverId: (receiverId: string) => void
  setListFriend: (listFriend: User[]) => void
  setListPendingRequest: (listPendingRequest: SenderStatusRequest[]) => void
  setListPendingSended: (listPendingSended: ReceiverStatusRequest[]) => void
  setIsAccept: (isAccept: boolean) => void
  resetFriendStore: () => void
}

export const useFriendStore = create<FriendState>((set) => ({
  senderId: "",
  receiverId: "",
  isAccept: false,
  listFriend: [],
  listPendingRequest: [],
  listPendingSended: [],
  setSenderId: (senderId: string) => set({ senderId }),
  setReceiverId: (receiverId: string) => set({ receiverId }),
  setListFriend: (listFriend: User[]) => set({ listFriend }),
  setListPendingRequest: (listPendingRequest: SenderStatusRequest[]) => set({ listPendingRequest }),
  setListPendingSended: (listPendingSended: ReceiverStatusRequest[]) => set({ listPendingSended }),
  setIsAccept: (isAccept: boolean) => set({ isAccept }),
  resetFriendStore: () => set({ senderId: "", receiverId: "" }),
}))
