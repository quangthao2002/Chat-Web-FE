import { useAuthContext } from "@/context/AuthContext"
import { extractTime } from "@/untils/extractTime"
import useConversation from "@/zustand/useConversation"

const Message = ({ message }) => {
  const { authUser } = useAuthContext()

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
        {/* <div className="chat-header px-1">
          Quang Thảo
          <time className="text-xs opacity-50 ml-1">12:45</time>
        </div> */}
        <div className={`chat-bubble text-white mt-1  ${bubbleBgColor}`}>{message.text}</div>
        {/* <div className="chat-bubble chat-bubble-info">Hello</div> */}
        <div className="chat-footer opacity-50 text-xs gap-1 items-center">{formatTime}</div>
      </div>
    </>

  )
}

export default Message
