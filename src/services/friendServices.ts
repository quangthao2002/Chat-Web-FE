import axiosClient from "./axiosClient"

interface User {
  id: string
}

const friendServices = {
  getFriends: ({ user }: { user: User }) => {
    return axiosClient.get("/user/get-friends", { params: { user } })
  },
  searchUser: ({ phone }: { phone: User }) => {
    return axiosClient.get("/search-user/:searchValue", { params: { searchValue: phone } })
  },
  sendFriendRequest: ({ receiverId, user }: { receiverId: string; user: User }) => {
    return axiosClient.post("/user/send-friend-request", { receiverId, user })
  },
  acceptFriendRequest: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
    return axiosClient.post("/user/send-friend-request", { senderId, receiverId })
  },
  getListFriendRequestPending: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-pending?userId=${userId}`)
  },
}

export default friendServices
