import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import AccountItem from "../sidebar/contain/AccountItem"
import { useEffect } from "react"

const PhoneBookFriendList = () => {
  const { pendingRequests, getListFriendRequestPending } = useGetListRequestPending()

  useEffect(() => {
    getListFriendRequestPending()
    console.log("getListFriendRequestPending: ", getListFriendRequestPending())
  }, [])

  return (
    <div className="my-5 mx-3 ">
      <div className="bg-white p-3">
        <h1>Confirm friend</h1>
        {pendingRequests.map((item, index) => (
          <AccountItem key={index} data={item} />
        ))}
      </div>
    </div>
  )
}

export default PhoneBookFriendList
