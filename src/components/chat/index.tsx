import ChatInput from "./ChatInput"
import Sticker from "./actions/Sticker"
import Image from "./actions/Image"
import File from "./actions/File"
import useConversation from "@/zustand/useConversation"

const Chat = () => {
  const { isTyping } = useConversation()
  return (
    <div className="bg-white">
      {isTyping ? (
        <div
          className="flex items-center justify-between"
          style={{ position: "absolute", width: "30%", height: "12px", backgroundColor: "seashell", bottom: "106px" }}
        >
          typing.......
        </div>
      ) : (
        <></>
      )}
      <div className="flex items-center border-y h-[46px] pl-2 cursor-pointer gap-5 ">
        <Sticker />
        <Image />
        <File />
      </div>
      <ChatInput />
    </div>
  )
}

export default Chat
