import { GroupIProps } from "@/types/group"
import { create } from "zustand"

type GroupState = {
  listMember: string[] | []
  listAdmin: string[] | []
  listGroup: GroupIProps[] | []
  setListMember: (listMember: string[]) => void
  setListAdmin: (listAdmin: string[]) => void
  setListGroup: (listGroup: GroupIProps[]) => void
}

export const useGroupStore = create<GroupState>((set) => ({
  listMember: [],
  listAdmin: [],
  listGroup: [],
  setListMember: (data: string[]) => set({ listMember: data }),
  setListAdmin: (data: string[]) => set({ listAdmin: data }),
  setListGroup: (data: GroupIProps[]) => set({ listGroup: data }),
}))
