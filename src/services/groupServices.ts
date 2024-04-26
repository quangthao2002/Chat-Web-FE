import { GroupIProps } from "@/types/group"
import axiosClient from "./axiosClient"

const groupServices = {
  getGroupByUserId: (userId: string) => {
    return axiosClient.get(`rooms/user/${userId}`)
  },
  createGroup: (data: GroupIProps) => {
    return axiosClient.post("/room/create-group", data)
  },
  deleteGroup: (id: string) => {
    return axiosClient.delete(`/room/${id}`)
  },
  addUserToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.put(`/room/add-members/${roomId}`, userIds)
  },
  deleteUserFromGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.delete(`/room/delete-members/${roomId}`, { data: userIds })
  },
  addAdminToGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.put(`/room/add-admins/${roomId}`, userIds)
  },
  deleteAdminFromGroup: ({ roomId, userIds }: { roomId: string; userIds: string[] }) => {
    return axiosClient.delete(`/room/delete-admins/${roomId}`, { data: userIds })
  },
}

export default groupServices
