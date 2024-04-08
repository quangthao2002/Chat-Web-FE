import { useEffect } from "react"
import useSocketClient from "../useSocketClient"
import useGetListRequestPending from "./useGetListRequestPending"

const useSendFriendRequest = () => {
  const { getSocket, userId } = useSocketClient()
  const { getListFriendRequestPending } = useGetListRequestPending()

  const sendFriendRequest = (receiverId: string) => {
    console.log(`Friend request sent from ${userId} to ${receiverId}`)
    getSocket()?.emit("send-friend-request", { senderId: userId, receiverId })
  }

  useEffect(() => {
    getSocket()?.on("friend-request-sent", (payload): void => {
      console.log("payload", payload)
      getListFriendRequestPending()
    })
  }, [getSocket()])

  return { sendFriendRequest }
}

export default useSendFriendRequest
