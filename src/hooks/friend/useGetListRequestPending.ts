import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import { toast } from "react-toastify"

const useGetListRequestPending = () => {
  const { authUser } = useAuthContext()
  const { receiverId, setListPendingRequest, resetFriendStore } = useFriendStore()

  const getListRequestPending = async (userId: string) => {
    try {
      const res = await friendServices.getListFriendRequestPending(userId)
      if (res && res.data) {
        setListPendingRequest(res.data)
      } else {
        toast.error("Fail to getListRequestPending")
      }
    } catch (error) {
      toast.error("Lỗi hệ thống. Hãy thử tải lại trang!")
    }
  }

  useEffect(() => {
    if (authUser?.user?.id === receiverId) {
      getListRequestPending(receiverId)
      resetFriendStore()
    }
  }, [receiverId])

  return { getListRequestPending }
}

export default useGetListRequestPending
