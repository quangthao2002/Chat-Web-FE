/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import useAcceptFriendRequest from "@/hooks/friend/useAcceptFriendRequest"
import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import { UserStatusRequest } from "@/types/user"
import { useFriendStore } from "@/zustand/useFriendStore"
import { useEffect } from "react"
import AccountItem from "../sidebar/contain/AccountItem"

const PhoneBookFriendList = () => {
  const { authUser } = useAuthContext()
  const { acceptFriendRequest } = useAcceptFriendRequest()
  const { listPendingRequest } = useFriendStore()
  const { getListRequestPending } = useGetListRequestPending()

  const handleAcceptFriend = async (item: UserStatusRequest) => {
    acceptFriendRequest(item.sender.id)
  }

  useEffect(() => {
    getListRequestPending(authUser?.user?.id)
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white h-[77px] flex items-center px-5">
        <h1 className="text-[25px] font-semibold ">
          Danh sách bạn bè của <span className="text-blue-400">{authUser?.user?.fullName}</span>
        </h1>
      </div>

      <div className="bg-slate-100 flex-1 p-3">
        <div className="grid grid-cols-2 gap-4">
          {listPendingRequest?.map((item: any, index) => (
            <AccountItem key={index} data={item?.sender} title="Chấp nhận" onClick={() => handleAcceptFriend(item)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhoneBookFriendList
