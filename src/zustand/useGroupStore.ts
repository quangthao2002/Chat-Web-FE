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
  setListMember: (listMember: string[]) => set({ listMember }),
  setListAdmin: (listAdmin: string[]) => set({ listAdmin }),
  setListGroup: (listGroup: GroupIProps[]) => set({ listGroup }),
}))
