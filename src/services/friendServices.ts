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
  sendFriendRequest: ({ receiverId }: { receiverId: string }) => {
    return axiosClient.post("/user/send-friend-request", { receiverId })
  },
  acceptFriendRequest: ({ senderId }: { senderId: string }) => {
    return axiosClient.post("/user/accept-friend-request", { senderId })
  },
  getListFriendRequestPending: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-pending?userId=${userId}`)
  },
}

export default friendServices
