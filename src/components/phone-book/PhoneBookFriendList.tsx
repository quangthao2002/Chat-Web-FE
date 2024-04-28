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
    <div className="my-5 mx-3 ">
      <div className="bg-white p-3">
        <h1 className="text-[25px] font-semibold mb-3">Confirm friend {authUser?.user?.fullName}</h1>
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
