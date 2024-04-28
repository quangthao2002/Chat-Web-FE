import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { toast } from "react-toastify"
import useGetListRequestPending from "./useGetListRequestPending"

const useAcceptFriendRequest = () => {
  const { authUser } = useAuthContext()
  const { getListRequestPending } = useGetListRequestPending()

  const acceptFriendRequest = async (senderId: string) => {
    try {
      const res = await friendServices.acceptFriendRequest({ senderId: senderId })
      if (res.data) {
        toast.success("Accept friend successfully")
        getListRequestPending(authUser?.user?.id)
      }
    } catch (error) {
      console.log("error: ", error)
    }
  }

  return { acceptFriendRequest }
}

export default useAcceptFriendRequest
