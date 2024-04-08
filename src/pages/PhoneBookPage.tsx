import PhoneBookFriendList from "@/components/phone-book/PhoneBookFriendList"
import PhoneBookFriendRequest from "@/components/phone-book/PhoneBookFriendRequest"
import PhoneBookJoinedGroup from "@/components/phone-book/PhoneBookJoinedGroup"
import { Tab, useTabContext } from "@/context/TabContext"

const PhoneBookPage = () => {
  const { childActiveTab } = useTabContext()

  return (
    <div>
      {childActiveTab === Tab.JoinedRequest ? (
        <PhoneBookFriendRequest />
      ) : childActiveTab === Tab.JoinedGroups ? (
        <PhoneBookJoinedGroup />
      ) : (
        <PhoneBookFriendList />
      )}
    </div>
  )
}

export default PhoneBookPage
