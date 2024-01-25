import React from "react";
import Search from "./search";
import SidebarMessage from "./contain/SidebarMessage";

const Sidebar = () => {
  return (
    <div className="w-[339px] h-screen bg-white border-r">
      <Search />
      <div className="">
        <SidebarMessage />
      </div>
    </div>
  );
};

export default Sidebar;
