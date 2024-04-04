import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"

const PhoneBookFriendRequest = () => {
  const { getListFriendRequestPending } = useGetListRequestPending()

  console.log("getListFriendRequestPending: ", getListFriendRequestPending)
  return <div>PhoneBookFriendRequest</div>
}

export default PhoneBookFriendRequest
