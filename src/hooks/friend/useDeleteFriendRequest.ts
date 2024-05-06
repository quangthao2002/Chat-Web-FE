import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { toast } from "react-toastify"
import useGetListRequestPending from "./useGetListRequestPending"

const useDeleteFriendRequest = () => {
  const { authUser } = useAuthContext()
  const { getListRequestPending } = useGetListRequestPending()

  const deleteFriendRequest = async (senderId: string) => {
    try {
      const res = await friendServices.deleteFriendRequest({ senderId })
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

  return { deleteFriendRequest }
}

export default useDeleteFriendRequest
