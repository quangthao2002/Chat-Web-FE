import { Tab, useTabContext } from "@/context/TabContext"
import { TiContacts } from "react-icons/ti"
import SidebarPhoneBookItem from "./SidebarPhoneBookItem"

const SidebarPhoneBook = () => {
  const { childActiveTab, setChildActiveTab } = useTabContext()

  const handleOpenFriendList = () => setChildActiveTab(Tab.FriendList)
  const handleOpenJoinedGroups = () => setChildActiveTab(Tab.JoinedGroups)
  const handleOpenFriendRequest = () => setChildActiveTab(Tab.FriendRequest)

  const list = [
    { icon: TiContacts, title: Tab.FriendList, onClick: handleOpenFriendList },
    { icon: TiContacts, title: Tab.JoinedGroups, onClick: handleOpenJoinedGroups },
    { icon: TiContacts, title: Tab.FriendRequest, onClick: handleOpenFriendRequest },
  ]
  return (
    <div>
      {list.map((item, index) => (
        <SidebarPhoneBookItem
          key={item.title + index}
          active={item.title === childActiveTab}
          Icon={item.icon}
          title={item.title}
          onClick={item.onClick}
        />
      ))}
    </div>
  )
}

export default SidebarPhoneBook
