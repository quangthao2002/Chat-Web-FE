import React from "react"

interface ActionButtonProps {
  onClick: () => void
  text: string
  className?: string
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, text, className = "text-gray-800" }) => (
  <button onClick={onClick} className={`${className} w-full hover:bg-red-100 py-2 px-4 font-semibold`}>
    {text}
  </button>
)

export default ActionButton
