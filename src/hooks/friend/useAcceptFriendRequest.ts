import { useEffect, useState } from "react"
import useSocketClient from "../useSocketClient"

const useAcceptFriendRequest = () => {
  const { getSocket } = useSocketClient()
  const [status, setStatus] = useState<"success" | "fail">("fail")

  const acceptFriendRequest = (senderId: string, receiverId: string) => {
    getSocket()?.emit("accept-friend-request", { senderId, receiverId })
  }

  useEffect(() => {
    getSocket()?.on("friend-request-accepted", (payload) => {
      setStatus("success")
      console.log(`Friend request accepted from ${payload.senderId} to ${payload.receiverId}`)
    })
  }, [getSocket()])

  return { acceptFriendRequest, status }
}

export default useAcceptFriendRequest
