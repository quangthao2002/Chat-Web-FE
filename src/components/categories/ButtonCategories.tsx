import React from "react"
import { IconType } from "react-icons/lib"

interface ButtonProps {
  Icon: IconType
  size: number
  onClick?: () => void
  children?: React.ReactNode
  badgeNumber?: number
}

const ButtonCategories: React.FC<ButtonProps> = ({ Icon, size, onClick, children, badgeNumber }) => {
  return (
    <button className="btn btn-circle text-white bg-primary border-none relative" onClick={onClick}>
      <Icon size={size} />
      {children}
      {badgeNumber && badgeNumber > 0 && (
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-400 rounded-full flex items-center justify-center text-white text-sm">
          {badgeNumber}
        </div>
      )}
    </button>
  )
}

export default ButtonCategories
