/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChatbotContext } from "@/context/ConversationChatbotContext"
import useConversation from "@/zustand/useConversation"
import { SetStateAction, useRef, useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
import { BsRobot, BsSend } from "react-icons/bs"
import axios from "axios"
const Chatbot1 = () => {
  const { showConversationChatbot } = useChatbotContext()
  const [message, setMessage] = useState("")
  const { messagesChatbot, setMessagesChatbot, selectedConversationChatbot } = useConversation()
  const [isBotThinking, setIsBotThinking] = useState(false)
  const messagesEndRef = useRef(null)

  const handleChangeMessage = (e: { target: { value: SetStateAction<string> } }) => {
    setMessage(e.target.value)
  }

  const chatbotMessages = messagesChatbot[selectedConversationChatbot?.id] || []
  const handleChat = async () => {
    try {
      if (!message) return
      setIsBotThinking(true)

      setMessagesChatbot(selectedConversationChatbot?.id, { text: message, type: "user" })

      setMessage("")

      const response = await axios.post(`http://13.229.141.185:3000/api/v1/prediction/df8adb6d-b146-40a7-9928-3bdd22aabc7f`, { "question":message })
     
      // Add bot message to messages
      setMessagesChatbot(selectedConversationChatbot?.id, { text: response?.data?.text, type: "bot" })
    } catch (err) {
      console.error(err)
    } finally {
      setIsBotThinking(false)
    }
  }

  return (
    <>
      {showConversationChatbot && (
        <div className="relative bg-white w-full flex-1 z-50 flex flex-col overflow-y-auto">
          <div className="bg-gray-300 text-center relative flex justify-center gap-3 p-1 ">
            <div className={`avatar`}>
              <div className="w-12 rounded-full">
                <img
                  src={selectedConversationChatbot?.avatar}
                  alt={selectedConversationChatbot?.name}
                  className="rounded-full w-10 h-10"
                />
              </div>
            </div>
            <p className="font-bold text-white text-xl mt-2">{selectedConversationChatbot?.name}</p>
          </div>

          <ul className="p-4 overflow-y-auto h-24 flex-grow pb-28">
            {chatbotMessages.map((msg: any, index: number) => (
              <li key={index} className={`flex gap-1 ${msg.type === "user" ? "justify-end" : ""}`}>
                {msg.type === "bot" && <BsRobot className="w-4 h-4 self-end flex-shrink-0" />}
                <p
                  className={`text-black  max-w-3xl p-3 rounded-lg ${msg.type === "user" ? "bg-blue-400 text-white mt-4 mb-4" : "bg-gray-300 ml-1 font-semibold"}`}
                >
                  {msg.text}
                </p>
              </li>
            ))}
            {isBotThinking && (
              <li className="flex mt-2 ">
                <BsRobot className="w-6 h-6 self-end mr-2" />
                <p className="text-black font-normal max-w-80 bg-gray-300 p-1 mr-1 rounded-md ">
                  <BiLoaderCircle size={20} />
                </p>
              </li>
            )}
            <div ref={messagesEndRef} />
          </ul>

          <div className="flex absolute bottom-0 w-full gap-2 bg-white border-t-2 pt-1 pb-1 pr-5 pl-5">
            <textarea
              placeholder="Enter a message..."
              className="h-14 w-full border-none outline-none resize-none pt-4"
              onChange={handleChangeMessage}
              value={message}
              onKeyPress={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault()
                  handleChat()
                }
              }}
            />
            <BsSend className="text-gray-400 w-5 h-5 self-center cursor-pointer" onClick={handleChat} />
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot1
