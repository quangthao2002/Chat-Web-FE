import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { toast } from "react-toastify"
import useGetListRequestPending from "./useGetListRequestPending"

const useAcceptFriendRequest = () => {
  const { authUser } = useAuthContext()
  const { getListRequestPending } = useGetListRequestPending()

  const acceptFriendRequest = async (senderId: string) => {
    try {
      const res = await friendServices.acceptFriendRequest({ senderId })
      if (res.data) {
        toast.success("Accept friend successfully")
        getListRequestPending(authUser?.user?.id)
      } else {
        toast.error("Fail to accept friend")
      }
    } catch (error) {
      console.log("error: ", error)
      toast.error("Lỗi hệ thống. Hãy thử tải lại trang!")
    }
  }

  return { acceptFriendRequest }
}

export default useAcceptFriendRequest
