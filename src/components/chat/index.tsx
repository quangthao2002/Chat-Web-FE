import ChatInput from "./ChatInput"
import Sticker from "./actions/Sticker"
import Image from "./actions/Image"
import File from "./actions/File"
const Chat = () => {
  return (
    <div className="bg-white">
      <div className="flex items-center border-y h-[46px] pl-2 cursor-pointer gap-5 ">
        <Sticker />
        <Image />
        <File />
        <Image />
        <File />
      </div>
      <ChatInput handleSend={() => {}} />
    </div>
  )
}

export default Chat
