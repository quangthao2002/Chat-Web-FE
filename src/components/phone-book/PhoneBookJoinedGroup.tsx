import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"

const PhoneBookJoinedGroup = () => {
  const { getListFriendRequestPending } = useGetListRequestPending()

  console.log("getListFriendRequestPending: ", getListFriendRequestPending)
  return <div>PhoneBookJoinedGroup</div>
}

export default PhoneBookJoinedGroup
