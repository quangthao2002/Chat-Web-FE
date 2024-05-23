/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthContext } from "@/context/AuthContext"
import useConversation from "@/zustand/useConversation"
import useSocket from "@/zustand/useSocket"
import { useState } from "react"
import { BsSend } from "react-icons/bs"
import { MdEmojiEmotions } from "react-icons/md"
import data from "@emoji-mart/data"
import Picker from "@emoji-mart/react"
const ChatInput = () => {
  const { selectedConversation, setMessages, messages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser?.user?.id
  const [typing, setTyping] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { sendMessage, sendTyping, sendStopTyping, sendGroupMessage } = useSocket(currentUserId)

  const [message, setMessage] = useState("")

  const handleSendMessage = (e: { preventDefault: () => void }) => {
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
      roomId: selectedConversation?.ownerId ? selectedConversation.id : null,
      recipientId: !selectedConversation?.ownerId ? selectedConversation.id : null,
      created_at: new Date(),
      user: authUser?.user,
    }

    if (selectedConversation.ownerId) {
      sendGroupMessage(newMessage)
    } else {
      sendMessage(newMessage)
    }
    !selectedConversation.ownerId ? setMessages([...messages, newMessage]) : null
    setMessage("")
    sendStopTyping(selectedConversation.id)
    setIsOpen(false)
  }

  const typingHandler = (e: any) => {
    setMessage(e.target.value)
    setIsOpen(false)
    if (e.target.value.trim() === "") {
      sendStopTyping(selectedConversation.id)
    }
    if (!typing) {
      setTyping(true)
      sendTyping(selectedConversation.id)
    }

    const lastTypingTime = new Date().getTime()
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

  const handleOpenEmojiList = () => {
    setIsOpen(!isOpen)
  }

  return (
    <form className="pt-3 pl-4 pr-[10px] pb-[20px] " onSubmit={handleSendMessage}>
      <div className="h-[27px] w-full relative">
        <input
          type="text"
          className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-600 text-gray-600"
          placeholder={`Send a message`}
          value={message}
          onChange={typingHandler}
        />
        {isOpen && (
          <div className="flex" style={{ position: "absolute", right: 0, bottom: "32px" }}>
            <Picker data={data} onEmojiSelect={(e: any) => setMessage(message + e.native)} />
          </div>
        )}
        <div className="absolute inset-y-0 end-0 items-center mr-10 px mt-3 cursor-pointer">
          <button type="button" onClick={handleOpenEmojiList} className="">
            <MdEmojiEmotions size={23} />
          </button>
        </div>
        <button type="submit" className="absolute inset-y-0 end-0 items-center pe-3 mt-3 ">
          <BsSend size={20} className="text-gray-400" />
        </button>
      </div>
    </form>
  )
}
export default ChatInput
