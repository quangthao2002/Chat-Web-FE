import React from "react"
import { IconType } from "react-icons/lib"

interface IProps {
  Icon: IconType
  title: string
  active?: boolean
  onClick: () => void
}

const SidebarPhoneBookItem: React.FC<IProps> = ({ Icon, title, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`${active ? "bg-[#e5efff]" : "hover:bg-[#f1f5fa] "} w-full cursor-pointer px-[18px] py-[15px] flex items-center gap-4`}
    >
      <Icon size={30} />
      <div className="capitalize text-[1rem] font-medium">{title}</div>
    </button>
  )
}

export default SidebarPhoneBookItem
