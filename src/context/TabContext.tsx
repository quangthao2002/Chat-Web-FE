import React, { useContext, createContext } from "react"

export enum Tab {
  Chat = "chat",
  PhoneBook = "phone-book",
  Todo = "todo",

  FriendList = "Friend Lists",
  JoinedGroups = "Joined Groups",
  FriendRequest = "Friend Requests",
}

interface TabContextType {
  activeTab: Tab
  setActiveTab: (tab: Tab) => void

  childActiveTab: Tab
  setChildActiveTab: (tab: Tab) => void
}
const TabContext = createContext({} as TabContextType)
export const useTabContext = () => useContext(TabContext)

const TabProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = React.useState<Tab>(Tab.Chat)
  const [childActiveTab, setChildActiveTab] = React.useState<Tab>(Tab.FriendList)

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab, childActiveTab, setChildActiveTab }}>
      {children}
    </TabContext.Provider>
  )
}

export default TabProvider
