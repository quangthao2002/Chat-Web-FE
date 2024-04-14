import { GroupIProps } from "@/types/group"
import { create } from "zustand"

type GroupState = {
  listMember: string[] | []
  listGroup: GroupIProps[] | []
  setListMember: (listMember: string[]) => void
  setListGroup: (listGroup: GroupIProps[]) => void
}

export const useGroupStore = create<GroupState>((set) => ({
  listMember: [],
  listGroup: [],
  setListMember: (data: string[]) => set({ listMember: data }),
  setListGroup: (data: GroupIProps[]) => set({ listGroup: data }),
}))
