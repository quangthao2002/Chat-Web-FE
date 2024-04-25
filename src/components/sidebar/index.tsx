import { Tab, useTabContext } from "@/context/TabContext"
import SidebarMessage from "./contain/SidebarMessage"
import Search from "./search/Search"
import SidebarPhoneBook from "./phone-book/SidebarPhoneBook"

const Sidebar = () => {
  const { activeTab } = useTabContext()

  return (
    <div className="w-[339px] h-screen bg-white border-r flex flex-col">
      <Search />
      {activeTab === Tab.PhoneBook ? <SidebarPhoneBook /> : <SidebarMessage />}
    </div>
  )
}

export default Sidebar
