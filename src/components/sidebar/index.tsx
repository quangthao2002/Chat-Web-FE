import React from "react";
import Search from "./search/Search";
import SidebarMessage from "./contain/SidebarMessage";

const Sidebar = () => {
  return (
    <div className="w-[339px] h-screen bg-white border-r">
      <Search />
      {/* <div className="divider px-0"/> */}
        <SidebarMessage />
    </div>
  );
};

export default Sidebar;
