import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { toast } from "react-toastify"
import useGetListRequestPending from "./useGetListRequestPending"

const useCancelFriendRequest = () => {
  const { authUser } = useAuthContext()
  const { getListRequestPending } = useGetListRequestPending()

  const cancelFriendRequest = async (receiverId: string) => {
    try {
      const res = await friendServices.cancelFriendRequest({ receiverId })
      if (res.data) {
        toast.success("Hủy lời mời kết bạn thành công!")
        getListRequestPending(authUser?.user?.id)
      } else {
        toast.success("Hủy lời mời kết bạn thất bại!")
      }
    } catch (error) {
      console.log("error: ", error)
      toast.error("Lỗi hệ thống. Hãy thử tải lại trang!")
    }
  }

  return { cancelFriendRequest }
}

export default useCancelFriendRequest
