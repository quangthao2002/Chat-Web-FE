import SidebarMessage from "./contain/SidebarMessage"
import Search from "./search/Search"

const Sidebar = () => {
  return (
    <div className="w-[339px] h-screen bg-white border-r">
      <Search />
      {/* <div className="divider px-0"/> */}
      <SidebarMessage />
    </div>
  )
}

export default Sidebar
