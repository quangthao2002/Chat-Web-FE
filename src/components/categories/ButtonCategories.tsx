import React from "react"
import { IconType } from "react-icons/lib"

interface ButtonProps {
  Icon: IconType
  size: number
  onClick?: () => void
  children?: React.ReactNode
  badgeNumber?: number
  isActive?: boolean
}

const ButtonCategories: React.FC<ButtonProps> = ({ Icon, size, onClick, children, badgeNumber, isActive }) => {
  return (
    <button
      className={`${isActive ? "bg-[#006edc] " : "bg-primary hover:bg-[#006edc] "} text-white  border-none relative p-3`}
      onClick={onClick}
    >
      <Icon size={size} />
      {children}
      {badgeNumber && badgeNumber > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center text-white text-sm">
          {badgeNumber}
        </div>
      )}
    </button>
  )
}

export default ButtonCategories
