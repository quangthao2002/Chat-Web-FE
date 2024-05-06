import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import { toast } from "react-toastify"

const useGetFriend = () => {
  const { authUser } = useAuthContext()
  const { senderId, setListFriend, isAccept } = useFriendStore()

  const getFriend = async (userId: string) => {
    try {
      const res = await friendServices.getFriends(userId)
      if (res && res.data) {
        setListFriend(res.data)
      } else {
        toast.error("Fail to getFriend")
      }
    } catch (error) {
      toast.error("Lỗi hệ thống. Hãy thử tải lại trang!")
    }
  }

  useEffect(() => {
    if (authUser?.user?.id === senderId) {
      getFriend(senderId)
    }
  }, [isAccept])

  return { getFriend }
}

export default useGetFriend
