import { useAuthContext } from "@/context/AuthContext"
import { extractTime } from "@/utils/extractTime"

import axios from "axios"
import { useEffect, useState } from "react"
import { IoIosMore } from "react-icons/io"
import FileMessage from "./FileMessage"
import useConversation from "@/zustand/useConversation"

const Message = ({ message, isLastMessage }) => {
  const { authUser } = useAuthContext()
  const [isDeleted, setIsDeleted] = useState(false)
  const { selectedConversation } = useConversation()

  const isImage = (url) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    if (imageExtensions.includes(extension)) {
      return true
    } else {
      return false
    }
  }

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv"] // Add more extensions if needed
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    if (videoExtensions.includes(extension)) {
      return true
    } else {
      return false
    }
  }
  const isFile = (url) => {
    const fileExtensions = [
      ".doc",
      ".docx",
      ".pdf",
      ".ppt",
      ".pptx",
      ".xls",
      ".xlsx",
      ".zip",
      ".rar",
      ".7z",
      ".txt",
      ".csv",
    ] // Add more extensions if needed

    // Check if URL starts with "data:application/"

    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()

    if (fileExtensions.includes(extension)) {
      return true // It's a file URL
    } else {
      return false // It's neither a file nor an image URL
    }
  }

  const fromMe = message.user?.id === authUser.user.id

  const formatTime = extractTime(message.created_at)
  const chatClassName = fromMe ? "chat chat-end" : "chat chat-start"
  const avatarClassName = fromMe ? authUser.user.avatar : selectedConversation.avatar
  const bubbleBgColor = fromMe ? "bg-blue-500" : ""
  const seenAvatarClassName = fromMe ? selectedConversation.avatar : authUser.user.avatar
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
  const renderMessage = () => {
    if (isImage(message.text)) {
      return <img style={{ maxWidth: "400px", maxHeight: "400px" }} src={message.text} alt="Uploaded" />
    }
    if (isVideo(message.text)) {
      return (
        <video width="320" height="240" controls>
          <source src={message.text} type="video/mp4" />
        </video>
      )
    }
    if (isFile(message.text)) {
      return <FileMessage url={message.text} />
    }

    return <div className={`chat-bubble text-white mt-1  ${bubbleBgColor}`}>{message.text}</div>
  }

  return (
    <>
      <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS chat bubble component" src={avatarClassName} />
          </div>
        </div>
        {(message && message.isDeleted) || isDeleted ? (
          <div className="chat-bubble text-white mt-1 bg-red-500">Tin nhắn đã được thu hồi</div>
        ) : (
          <>
            <div
              className={`flex ${!fromMe ? "flex-row-reverse" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={`chat-options ${showOptions ? "opacity-100" : "opacity-0"} ${fromMe ? "mr-2" : "ml-2"}`}>
                <div className={`dropdown dropdown-${fromMe ? "left" : "right"}`}>
                  <div tabIndex={0} role="button">
                    <IoIosMore size={15} />
                  </div>
                  {showOptions && (
                    <div tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-200 rounded-box w-52">
                      <button onClick={handleDeleteMessage} className="text-red-500">
                        {fromMe ? "Thu hồi tin nhắn" : "Xóa tin nhắn ở phía tôi"}
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {renderMessage()}
            </div>
          </>
        )}

        <div className="flex ">
          <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formatTime}</div>
        </div>
      </div>
    </>
  )
}

export default Message
