import SidebarMessage from "./contain/SidebarMessage"
import Search from "./search/Search"

const Sidebar = () => {
  return (
    <div className="w-[339px] h-screen bg-white border-r">
      <Search />
      <SidebarMessage />
    </div>
  )
}

export default Sidebar
