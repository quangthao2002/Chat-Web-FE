import { useAuthContext } from "@/context/AuthContext"
import groupServices from "@/services/groupServices"
import { useGroupStore } from "@/zustand/useGroupStore"
import { useEffect } from "react"
import { toast } from "react-toastify"

const useGroup = () => {
  const { authUser } = useAuthContext()
  const { listMember, setListGroup } = useGroupStore()

  const getGroupByUserId = async (userId: string) => {
    try {
      const res = await groupServices.getGroupByUserId(userId)
      if (res?.data?.status !== 200) {
        return toast.error(res?.data?.message)
      } else if (res.data) {
        setListGroup(res.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const userId = authUser?.user?.id || ""
    if (listMember?.find((item) => item === userId)) {
      getGroupByUserId(userId)
    }
  }, [listMember])

  return { getGroupByUserId }
}

export default useGroup
