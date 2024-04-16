import React from "react"

const Button = ({ text, onClick }: any) => {
  // Extracted button component
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer w-full hover:bg-blue-200 py-2 px-4 font-semibold text-red-600 mb-2"
    >
      {text}
    </button>
  )
}
export default Button
