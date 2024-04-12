import { UserStatusRequest } from "@/types/user"
import { create } from "zustand"

type FriendState = {
  senderId: string
  receiverId: string
  isAccept: boolean
  listFriend: UserStatusRequest[] | []
  listPendingRequest: UserStatusRequest[] | []
  listPendingSended: UserStatusRequest[] | []

  setListFriend: (listFriend: UserStatusRequest[]) => void
  setListPendingRequest: (listPendingRequest: UserStatusRequest[]) => void
  setListPendingSended: (listPendingSended: UserStatusRequest[]) => void
  setSenderId: (senderId: string) => void
  setReceiverId: (receiverId: string) => void
  setIsAccept: (isAccept: boolean) => void
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
  setListFriend: (listFriend: UserStatusRequest[]) => set({ listFriend }),
  setListPendingRequest: (listPendingRequest: UserStatusRequest[]) => set({ listPendingRequest }),
  setListPendingSended: (listPendingSended: UserStatusRequest[]) => set({ listPendingSended }),
  setIsAccept: (isAccept: boolean) => set({ isAccept }),
}))
