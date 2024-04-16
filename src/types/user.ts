export interface User {
  id: string
  username: string
  avatar?: string
  phone?: string
  isFriend?: boolean
}

export interface UserStatusRequest {
  id: string
  sender: User
  status: "pending" | "accepted" | "reject"
}

export interface UserWithFriend extends User {
  isFriend?: boolean
}
