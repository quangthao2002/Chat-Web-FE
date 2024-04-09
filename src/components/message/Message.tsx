import { useAuthContext } from "@/context/AuthContext"
import { extractTime } from "@/utils/extractTime"

import axios from "axios"
import { useCallback, useEffect, useRef, useState } from "react"
import { IoIosMore } from "react-icons/io"
import FileMessage from "./FileMessage"
import useConversation from "@/zustand/useConversation"
import ForwardMessageModal from "../modals/ForwardMessageModal"

const Message = ({ message, isLastMessage }: any) => {
  const { authUser } = useAuthContext()
  const [isDeleted, setIsDeleted] = useState(false)
  const [isModalOpen,setIsModalOpen]=useState(false)
  const { selectedConversation } = useConversation()
  const [isUnsend, setIsUnsend] = useState(false)
  // const [isNearBottom, setIsNearBottom] = useState(false);
  const [isNearTop, setIsNearTop] = useState(false)
  const messageRef = useRef(null)
  const [messageForward,setMessageForward]=useState("")
  const checkIsNearTop = useCallback(() => {
    if (messageRef.current) {
      const messageRect = messageRef.current.getBoundingClientRect()
      const topThreshold = 390

      if (messageRect.top < topThreshold) {
        setIsNearTop(true)
      } else {
        setIsNearTop(false)
      }
    }
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", checkIsNearTop)
    return () => {
      window.removeEventListener("scroll", checkIsNearTop)
    }
  }, [checkIsNearTop])

  useEffect(() => {
    checkIsNearTop()
  }, [message, checkIsNearTop])

  const isImage = (url: any) => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"]
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    if (imageExtensions.includes(extension)) {
      return true
    } else {
      return false
    }
  }

  const isVideo = (url: any) => {
    const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv"] // Add more extensions if needed
    const extension = url.substring(url.lastIndexOf(".")).toLowerCase()
    if (videoExtensions.includes(extension)) {
      return true
    } else {
      return false
    }
  }
  const isFile = (url: any) => {
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
  const handleUnsendMessage = async () => {
    const response = await axios.post(`http://localhost:3000/messages/unsendMessage/`, { message })
    if (response) {
      setIsUnsend(true)
    }
  }
  const handleOpenModal=()=>{
    setIsModalOpen(true)
    setMessageForward(message)
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
      {(message && (message.isDeleted || isDeleted)) ? (
        <></> // Render nothing if the message is deleted or IsDelete is true
      ) : (
        <div ref={messageRef} className={`chat ${chatClassName}`}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={avatarClassName} />
            </div>
          </div>
  
          <div
            className={`flex ${!fromMe ? "flex-row-reverse" : ""}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {(message && (message.isUnsend || isUnsend)) ? (
              <div className="chat-bubble text-white mt-1 bg-red-500">Tin nhắn đã được thu hồi</div>
            ) : (
              <>
                <div className={`chat-options ${showOptions ? "opacity-100" : "opacity-0"} ${fromMe ? "mr-2" : "ml-2"}`}>
                  <div className={`dropdown dropdown-${fromMe ? "left" : "right"} ${isNearTop ? "" : "dropdown-end"}`}>
                    <div tabIndex={0} role="button">
                      <IoIosMore size={15} />
                    </div>
                    {showOptions && (
                      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-gray-200 rounded-box w-52  ">
                        <li>
                          <a className="text-gray-500">Copy tin nhắn</a>
                        </li>
                        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
                        <li>
                          <a className="text-gray-500">Ghim tin nhắn</a>
                        </li>
                        <li>
                          <a className="text-gray-500">Dánh dấu tin nhắn</a>
                        </li>
                        <li>
                          <a className="text-gray-500">Chọn nhiều tin nhắn</a>
                        </li>
                        <li>
                          <a onClick={handleOpenModal} className="text-gray-500">Chuyển tiếp tin nhắn</a>
                        </li>
                        <div className="divider my-0 py-0 mx-1 h-1 mb-2" />
                        <li>
                          <a onClick={handleDeleteMessage} className="text-red-600">Xóa tin nhắn</a>
                        </li>
  
                        <li>
                          <a onClick={handleUnsendMessage} className="text-red-600">
                            {fromMe ? "Thu hồi tin nhắn" : "Xóa tin nhắn ở phía tôi"}
                          </a>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
                {renderMessage()}
              </>
            )}
          </div>
          <div className="flex">
            <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formatTime}</div>
          </div>
        </div>
      )}
      {isModalOpen&&<ForwardMessageModal messageForward={messageForward} onClose={()=>setIsModalOpen(false)}/>}
    </>
  );
  
}

export default Message
