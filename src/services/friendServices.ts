import axiosClient from "./axiosClient"

interface User {
  id: string
}

const friendServices = {
  getFriends: ({ user }: { user: User }) => {
    return axiosClient.get("/get-friends", { params: { user } })
  },
  searchUser: ({ phone }: { phone: User }) => {
    return axiosClient.get("/search-user/:searchValue", { params: { searchValue: phone } })
  },
  sendFriendRequest: ({ receiverId, user }: { receiverId: string; user: User }) => {
    return axiosClient.post("/send-friend-request", { receiverId, user })
  },
  acceptFriendRequest: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
    return axiosClient.post("/send-friend-request", { senderId, receiverId })
  },
  getListFriendRequestPending: ({ senderId, receiverId }: { senderId: string; receiverId: string }) => {
    return axiosClient.post("/get-list-friend-request-pending", { senderId, receiverId })
  },
}

export default friendServices
