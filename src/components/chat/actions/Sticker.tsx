import { useState } from "react"
import { LuSticker } from "react-icons/lu"
import EmojiPicker from "emoji-picker-react"
import useConversation from "@/zustand/useConversation"
import { useAuthContext } from "@/context/AuthContext"
import useSocket from "@/zustand/useSocket"
const Action1 = () => {
  const { selectedConversation, messages, setMessages } = useConversation()
  const { authUser } = useAuthContext()
  const currentUserId = authUser.user.id
  const [isOpen, setIsOpen] = useState(false)

  const { sendMessage } = useSocket(currentUserId)
  const handleOpenEmoji = () => {
    setIsOpen(!isOpen)
  }
  const onEmojiClicked = async (emojiData: EmojiClickData, event: MouseEvent) => {
    const newMessage = {
      text: emojiData.imageUrl,
      userId: currentUserId,
      recipientId: selectedConversation.id,
      created_at: new Date(),
      user: authUser.user,
    }
    sendMessage(newMessage)
    setMessages([...messages, newMessage])
    setIsOpen(false)
  }
  return (
    <div className="flex">
      <div className="absolute bottom-[7rem]">
        <EmojiPicker open={isOpen} onEmojiClick={onEmojiClicked} />
      </div>
      <button className="icon" onClick={handleOpenEmoji}>
        <LuSticker size={25} />
      </button>
    </div>
  )
}

export default Action1
