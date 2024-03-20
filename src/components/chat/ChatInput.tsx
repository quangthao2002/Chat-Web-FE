import { BsSend } from "react-icons/bs"
import { MdEmojiEmotions } from "react-icons/md";
const ChatInput = () => {
  return (
    <form className="pt-3 pl-4 pr-[10px] pb-[20px] ">
      <div className="h-[27px] w-full relative">
        <input type="text"
        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-600 text-gray-600"
        placeholder={`Send a message to quangthao`}
        />
        <button className="absolute inset-y-0 end-0 items-center mr-10 px mt-3 cursor-pointer">
          <MdEmojiEmotions size={23} />
        </button>
        <button type="submit" className="absolute inset-y-0 end-0 items-center pe-3 mt-3 ">
          <BsSend size={20} className="text-gray-400"/>
        </button>
      </div>
    </form>
  )
}

export default ChatInput
