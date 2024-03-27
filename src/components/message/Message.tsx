import { useAuthContext } from "@/context/AuthContext"
import { extractTime } from "@/utils/extractTime"
import useConversation from "@/zustand/useConversation"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()

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
        {message && isImage(message.text) ? (
          <img style={{ maxWidth: "400px", maxHeight: "400px" }} src={message.text} alt="Uploaded" />
        ) : (
          <div className={`chat-bubble text-white mt-1  ${bubbleBgColor}`}>{message.text}</div>
        )}

        <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formatTime}</div>
      </div>
    </>
  )
}

export default Message
