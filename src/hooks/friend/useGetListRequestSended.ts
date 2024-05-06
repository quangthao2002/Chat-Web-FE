import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import { toast } from "react-toastify"

const useGetListRequestSended = () => {
  const { authUser } = useAuthContext()
  const { senderId, setListPendingSended, resetFriendStore } = useFriendStore()

  const getListRequestSended = async (userId: string) => {
    try {
      const res = await friendServices.getListFriendRequestSended(userId)
      if (res && res.data) {
        setListPendingSended(res.data)
      } else {
        toast.error("Fail to getListRequestSended")
      }
    } catch (error) {
      toast.error("Lỗi hệ thống. Hãy thử tải lại trang!")
    }
  }

  useEffect(() => {
    if (authUser?.user?.id === senderId) {
      getListRequestSended(senderId)
      resetFriendStore()
    }
  }, [senderId])

  return { getListRequestSended }
}

export default useGetListRequestSended
