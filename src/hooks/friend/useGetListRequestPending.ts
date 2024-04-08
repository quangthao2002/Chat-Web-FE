import { useEffect } from "react"
import useSocketClient from "../useSocketClient"
import { useFriendStore } from "@/zustand/useFriendstore"

const useGetListRequestPending = () => {
  const { getSocket, userId } = useSocketClient()
  const { setListPendingRequest } = useFriendStore()

  const getListFriendRequestPending = () => {
    getSocket()?.emit("get-list-friend-request-pending", { senderId: userId })
  }

  useEffect(() => {
    getSocket()?.on("list-friend-request-pending", (friendRequests) => {
      console.log("Received list of pending friend requests:", friendRequests)
      setListPendingRequest(friendRequests)
    })
  }, [getSocket(), userId])

  return { getListFriendRequestPending, userId }
}

export default useGetListRequestPending
