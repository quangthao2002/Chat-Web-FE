export interface User {
  id: string
  username: string
  avatar?: string
  phone?: string
  isFriend?: boolean
}

interface StatusFriendRequest {
  id: string
  status: "pending" | "accepted" | "cancel"
}

export interface SenderStatusRequest extends StatusFriendRequest {
  sender: User
}

export interface ReceiverStatusRequest extends StatusFriendRequest {
  receiver: User
}

export interface Friend extends StatusFriendRequest {
  sender: User
  receiver: User
}
