import useGetListRequestPending from "@/hooks/friend/useGetListRequestPending"
import React from "react"

const PhoneBook = () => {
  const { getListFriendRequestPending } = useGetListRequestPending()

  console.log("getListFriendRequestPending: ", getListFriendRequestPending)
  return <div>PhoneBook</div>
}

export default PhoneBook
