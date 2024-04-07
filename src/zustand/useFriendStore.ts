import { UserStatusRequest } from "@/types/user"
import { create } from "zustand"

type FriendState = {
  listFriend: UserStatusRequest[] | []
  listPendingRequest: UserStatusRequest[] | []
  setListPendingRequest: (listPendingRequest: UserStatusRequest[]) => void
}

export const useFriendStore = create<FriendState>((set) => ({
  listFriend: [],
  listPendingRequest: [],
  setListPendingRequest: (listPendingRequest: UserStatusRequest[]) => set({ listPendingRequest }),
  setListFriend: (listFriend: UserStatusRequest[]) => set({ listFriend }),
}))
