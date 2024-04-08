import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import useSocket from "@/zustand/useSocket"
import { useState } from "react"
import { BsSend } from "react-icons/bs"
import { MdEmojiEmotions } from "react-icons/md"
const ChatInput = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser.user.id
  const [typing, setTyping] = useState(false)

  const { sendMessage, sendTyping, sendStopTyping } = useSocket(currentUserId)

  const [message, setMessage] = useState("")

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!selectedConversation) {
      return
    }
    if (message.trim() === "") {
      return
    }
    // gửi tin nhắn đến server
    const newMessage = {
      text: message,
      userId: currentUserId,
      recipientId: selectedConversation.id,
      created_at: new Date(),
      user: authUser.user,
    }

    // thêm tin mới vào danh sách tin nhắn
    sendMessage(newMessage)
    setMessages([...messages, newMessage])
    setMessage("")
    sendStopTyping(selectedConversation.id)
  }
  const typingHandler = (e) => {
    setMessage(e.target.value)
    if (e.target.value.trim() === "") {
      sendStopTyping(selectedConversation.id)
    }
    if (!typing) {
      setTyping(true)
      sendTyping(selectedConversation.id)
    }

    let lastTypingTime = new Date().getTime()
    const timerLength = 3000
    setTimeout(() => {
      const timeNow = new Date().getTime()
      const timeDiff = timeNow - lastTypingTime
      if (timeDiff >= timerLength && typing) {
        sendStopTyping(selectedConversation.id)
        setTyping(false)
      }
    }, timerLength)
  }
  return (
    <form className="pt-3 pl-4 pr-[10px] pb-[20px] " onSubmit={handleSendMessage}>
      <div className="h-[27px] w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-600 text-gray-600"
          placeholder={`Send a message to quangthao`}
          value={message}
          onChange={typingHandler}
        />
        <button className="absolute inset-y-0 end-0 items-center mr-10 px mt-3 cursor-pointer">
          <MdEmojiEmotions size={23} />
        </button>
        <button type="submit" className="absolute inset-y-0 end-0 items-center pe-3 mt-3 ">
          <BsSend size={20} className="text-gray-400" />
        </button>
      </div>
    </form>
  )
}
export default ChatInput
