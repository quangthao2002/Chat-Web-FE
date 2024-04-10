import { useAuthContext } from "@/context/AuthContext"
import useAcceptFriendRequest from "@/hooks/friend/useAcceptFriendRequest"
import friendServices from "@/services/friendServices"
import { UserStatusRequest } from "@/types/user"
import { useEffect, useState } from "react"
import AccountItem from "../sidebar/contain/AccountItem"

const PhoneBookFriendList = () => {
  const { authUser } = useAuthContext()
  const { acceptFriendRequest } = useAcceptFriendRequest()
  const [data, setData] = useState([])

  const handleAcceptFriend = async (item: UserStatusRequest) => {
    acceptFriendRequest(item.sender.id)
  }

  const getListFriendRequestPending = async () => {
    try {
      const res = await friendServices.getListFriendRequestPending(authUser.user.id)
      setData(res.data)
    } catch (error) {
      console.log("error: ", error)
    }
  }

  useEffect(() => {
    getListFriendRequestPending()
  }, [acceptFriendRequest])

  return (
    <div className="my-5 mx-3 ">
      <div className="bg-white p-3">
        <h1 className="text-[25px] font-semibold mb-3">Confirm friend {authUser?.user?.fullName}</h1>
        <div className="grid grid-cols-2 gap-4">
          {data?.map((item: any, index) => (
            <AccountItem key={index} data={item?.sender} title="Chấp nhận" onClick={() => handleAcceptFriend(item)} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PhoneBookFriendList
