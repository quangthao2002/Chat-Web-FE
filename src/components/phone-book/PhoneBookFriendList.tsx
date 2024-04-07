import { useAuthContext } from "@/context/AuthContext"
import useAcceptFriendRequest from "@/hooks/friend/useAcceptFriendRequest"
import { UserStatusRequest } from "@/types/user"
import { useFriendStore } from "@/zustand/useFriendStore"
import { toast } from "react-toastify"
import AccountItem from "../sidebar/contain/AccountItem"

const PhoneBookFriendList = () => {
  const { authUser } = useAuthContext()
  const { listPendingRequest } = useFriendStore()
  const { acceptFriendRequest } = useAcceptFriendRequest()

  const handleAcceptFriend = async (item: UserStatusRequest) => {
    acceptFriendRequest(item.sender.id)
    toast.success(`Đã chấp nhận lời mời kết bạn đến ${item.sender.username}`)
  }

  return (
    <div className="my-5 mx-3 ">
      <div className="bg-white p-3">
        <h1 className="text-[25px] font-semibold mb-3">Confirm friend {authUser?.user?.fullName}</h1>
        <div className="grid grid-cols-2 gap-4">
          {listPendingRequest?.map((item, index) => (
            <AccountItem key={index} data={item?.sender} title="Chấp nhận" onClick={() => handleAcceptFriend(item)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhoneBookFriendList
