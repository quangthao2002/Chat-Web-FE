import { useAuthContext } from "@/context/AuthContext"
import { extractTime } from "@/utils/extractTime"
import useConversation from "@/zustand/useConversation"
import axios from "axios"
import { useState } from "react"
import { IoIosMore } from "react-icons/io"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()
  const [isDeleted, setIsDeleted] = useState(false)
  const isImage = (url) => {
    const isImageUrl = url.startsWith("data:image/")
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"] // Add more extensions if needed
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    if (imageExtensions.includes(extension) || isImageUrl) {
      return true
    } else {
      return false
    }
  }
  const { selectedConversation } = useConversation()

  const fromMe = message.user?.id === authUser.user.id

  const formatTime = extractTime(message.created_at)
  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start"
  const avatarClassName = fromMe ? authUser.user.avatar : selectedConversation.avatar
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""

  const [showOptions, setShowOptions] = useState(false)

  const handleMouseEnter = () => {
    setShowOptions(true)
  }

  const handleMouseLeave = () => {
    setShowOptions(false)
  }

  const handleDeleteMessage = async () => {
    const response = await axios.post(`http://localhost:3000/messages/deleteMessage/`, { message })
    if (response) {
      setIsDeleted(true)
    }
  }
  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              // src={avatarClassName}
            />
          </div>
        </div>
        {(message && message.isDeleted) || isDeleted ? (
          <div className="chat-bubble text-white mt-1 bg-red-500">Tin nhắn đã được thu hồi</div>
        ) : (
          <>
            {message && isImage(message.text) ? (
              <img style={{ maxWidth: "400px", maxHeight: "400px" }} src={message.text} alt="Uploaded" />
            ) : (
              <div
                className={`flex ${!fromMe ? "flex-row-reverse" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className={`chat-options ${showOptions ? "opacity-100" : "opacity-0"} ${fromMe ? "mr-2" : "ml-2"}`}
                >
                  <div className={`dropdown dropdown-${fromMe ? "left" : "right"}`}>
                    <div tabIndex={0} role="button">
                      <IoIosMore size={15} />
                    </div>
                    {showOptions && (
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-200 rounded-box w-52">
                        <li>
                          <a onClick={handleDeleteMessage} className="text-red-500">
                            {fromMe ? "Thu hồi tin nhắn" : "Xóa tin nhắn ở phía tôi"}
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                <div className={`chat-bubble text-white mt-1  ${bubbleBgColor}`}>{message.text}</div>
              </div>
            )}
          </>
        )}

        <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formatTime}</div>
      </div>
    </>
  )
}

export default Message
