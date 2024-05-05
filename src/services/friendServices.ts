import axiosClient from "./axiosClient"

interface User {
  id: string
}

const friendServices = {
  getFriends: ({ user }: { user: User }) => {
    return axiosClient.get("/user/get-friends", { params: { user } })
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
  getListFriendRequestPending: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-pending?userId=${userId}`)
  },
  getListFriendRequestSended: (userId: string) => {
    return axiosClient.get(`/user/get-list-friend-request-sended?userId=${userId}`)
  },
}

export default friendServices
