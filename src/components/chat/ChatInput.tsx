import { useState } from "react"
import { BsSend } from "react-icons/bs"
import { MdEmojiEmotions } from "react-icons/md"

interface IProps {
  handleSend: (value: string) => void
}
const ChatInput = ({ handleSend }: IProps) => {
  const [value, setValue] = useState<string>("")

  return (
    <div className="pt-3 pl-4 pr-[10px] pb-[20px] ">
      <div className="h-[27px] w-full relative">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-600 text-gray-600"
          placeholder={`Send a message to quangthao`}
        />

        <button className="absolute inset-y-0 end-0 items-center mr-10 px mt-3 cursor-pointer">
          <MdEmojiEmotions size={23} />
        </button>
        <button
          type="button"
          onClick={() => handleSend(value)}
          className="absolute inset-y-0 end-0 items-center pe-3 mt-3 "
        >
          <BsSend size={20} className="text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export default ChatInput
