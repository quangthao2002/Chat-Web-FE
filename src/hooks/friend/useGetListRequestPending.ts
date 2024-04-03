import { useEffect, useState } from "react"
import useSocketClient from "../useSocketClient"

const useGetListRequestPending = () => {
  const { getSocket, userId } = useSocketClient()
  const [pendingRequests, setPendingRequests] = useState([])

  const getListFriendRequestPending = () => {
    getSocket()?.emit("get-list-friend-request-pending", { userId })
  }

  useEffect(() => {
    getSocket()?.on("list-friend-request-pending", (friendRequests) => {
      console.log("Received list of pending friend requests:", friendRequests)
      setPendingRequests(friendRequests)
    })
  }, [getSocket()])

  return { getListFriendRequestPending, pendingRequests }
}

export default useGetListRequestPending
