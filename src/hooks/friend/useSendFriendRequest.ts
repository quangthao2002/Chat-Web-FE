import { useEffect, useState } from "react"
import useSocketClient from "../useSocketClient"

const useSendFriendRequest = () => {
  const { getSocket, userId } = useSocketClient()
  const [status, setStatus] = useState<"success" | "fail">("fail")

  const sendFriendRequest = (receiverId: string) => {
    console.log(`socket: `, getSocket())
    getSocket()?.emit("send-friend-request", { userId, receiverId })
  }

  useEffect(() => {
    getSocket()?.on("friend-request-sent", (payload) => {
      setStatus("success")
      console.log(`Friend request sent from ${payload.senderId} to ${payload.receiverId}`)
    })
  }, [getSocket()])

  return { sendFriendRequest, status }
}

export default useSendFriendRequest
