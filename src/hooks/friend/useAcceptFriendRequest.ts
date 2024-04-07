import { useEffect } from "react"
import useSocketClient from "../useSocketClient"
import useGetListRequestPending from "./useGetListRequestPending"

const useAcceptFriendRequest = () => {
  const { getSocket, userId } = useSocketClient()
  const { getListFriendRequestPending } = useGetListRequestPending()

  const acceptFriendRequest = (receiverId: string) => {
    getSocket()?.emit("accept-friend-request", { senderId: receiverId, receiverId: userId })
  }

  useEffect(() => {
    getSocket()?.on("friend-request-accepted", (payload) => {
      getListFriendRequestPending()
    })
  }, [getSocket()])

  return { acceptFriendRequest }
}

export default useAcceptFriendRequest
