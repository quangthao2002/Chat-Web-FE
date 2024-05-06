import axiosClient from "./axiosClient"

const friendServices = {
  getFriends: (userId: string) => {
    return axiosClient.get(`/user/get-friends?userId=${userId}`)
  },
  searchUser: (phone: string) => {
    return axiosClient.get(`user/search-user/${phone}`)
  },
  sendFriendRequest: ({ receiverId }: { receiverId: string }) => {
    return axiosClient.post("/user/send-friend-request", { receiverId })
  },
  acceptFriendRequest: ({ senderId }: { senderId: string }) => {
    return axiosClient.post("/user/accept-friend-request", { senderId })
  },
  deleteFriendRequest: ({ senderId }: { senderId: string }) => {
    return axiosClient.post("/user/delete-friend-request", { senderId })
  },
  cancelFriendRequest: ({ receiverId }: { receiverId: string }) => {
    return axiosClient.post("/user/cancel-friend-request", { receiverId })
  },
  getListFriendRequestPending: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-pending?userId=${userId}`)
  },
  getListFriendRequestSended: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-sended?userId=${userId}`)
  },
}

export default friendServices
