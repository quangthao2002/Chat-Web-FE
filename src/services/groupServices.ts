import { GroupIProps } from "@/types/group"
import axiosClient from "./axiosClient"

const groupServices = {
  getGroupByUserId: (userId: string) => {
    return axiosClient.get(`rooms/user/${userId}`)
  },
  createGroup: (data: GroupIProps) => {
    return axiosClient.post("/room/create-group", data)
  },
  addUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.put(`/room/add-members/${roomId}`, userIds)
  },
  deleteUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.delete(`/room/delete-members/${roomId}`, { data: userIds })
  },
}

export default groupServices
