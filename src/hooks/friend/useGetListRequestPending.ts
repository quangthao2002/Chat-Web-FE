import { useAuthContext } from "@/context/AuthContext"
import friendServices from "@/services/friendServices"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"

const useGetListRequestPending = () => {
  const { authUser } = useAuthContext()
  const { receiverId, setListPendingRequest } = useFriendStore()

  const getListRequestPending = async (userId: string) => {
    const res = await friendServices.getListFriendRequestPending(userId)
    setListPendingRequest(res.data)
  }

  useEffect(() => {
    if (authUser.user.id === receiverId) {
      getListRequestPending(receiverId)
    }
  }, [receiverId])

  return { getListRequestPending }
}

export default useGetListRequestPending
