import { useAuthContext } from "@/context/AuthContext"
import React, { useRef, useState } from "react"
import { BiLoaderCircle } from "react-icons/bi"
import { BsRobot, BsSend } from "react-icons/bs"
import { IoMdClose } from "react-icons/io"
const Chatbot = () => {
  const { authUser } = useAuthContext()
  const username = authUser?.user?.username
  const [showChatbot, setShowChatbot] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{ text: `Hi ${username}👋`, type: "bot" }])
  const [isBotThinking, setIsBotThinking] = useState(false)
  const API_KEY = import.meta.env.VITE_CHAT_BOT

  const messagesEndRef = useRef(null)

  const handleChangeMessage = (e: { target: { value: React.SetStateAction<string> } }) => {
    setMessage(e.target.value)
  }

  const handleChat = async () => {
    try {
      if (!message) return
      setIsBotThinking(true)

      // Add user message to messages
      setMessages((prevMessages) => [...prevMessages, { text: message, type: "user" }])

      setMessage("")
      const API_URL = "https://api.openai.com/v1/chat/completions"

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
      const response = await fetch(API_URL, requestOptions)
      const data = await response.json()

      console.log(data)

      const botMessage = data.choices[0].message.content

      // Add bot message to messages
      setMessages((prevMessages) => [...prevMessages, { text: botMessage, type: "bot" }])
    } catch (err) {
      console.error(err)
    } finally {
      setIsBotThinking(false)
    }
  }

  return (
    <>
      {showChatbot ? (
        <button
          className="fixed right-10 bottom-14 h-12 w-12 flex justify-center items-center bg-gray-300 text-white rounded-full border-none outline-none shadow-xl cursor-pointer"
          onClick={() => setShowChatbot(false)}
        >
          <IoMdClose size={25} className="absolute" />
        </button>
      ) : (
        <button
          className="fixed right-10 bottom-14 h-12 w-12 flex justify-center items-center  text-white rounded-full border-none outline-none shadow-xl cursor-pointer"
          onClick={() => setShowChatbot(true)}
        >
          <div className="avatar absolute">
            <div className="w-12 rounded-full">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyIBpDCSNmMpWNR4mDzuhr46_1AuxzoOJsCakUbH2RQ&s"
                className="rounded-full w-10 h-10"
              />
            </div>
          </div>
        </button>
      )}
      {showChatbot && (
        <div className="fixed right-10 bottom-32 bg-white shadow-2xl w-96 rounded-2xl ">
          <div className="bg-gray-400 p-1 text-center relative ">
            <div className={`avatar`}>
              <div className="w-12 rounded-full">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYyIBpDCSNmMpWNR4mDzuhr46_1AuxzoOJsCakUbH2RQ&s"
                  className="rounded-full w-10 h-10"
                />
              </div>
            </div>
          </div>

          <ul className="h-96 p-4 overflow-y-auto pb-28">
            {messages.map((msg, index) => (
              <li key={index} className={`flex gap-1 ${msg.type === "user" ? "justify-end" : ""}`}>
                {msg.type === "bot" && <BsRobot className="w-4 h-4 self-end flex-shrink-0" />}
                <p
                  className={`text-black font-normal max-w-80 p-2 rounded-xl ${msg.type === "user" ? "bg-blue-400 text-white mt-4 mb-4" : "bg-gray-300 ml-1"}`}
                >
                  {msg.text}
                </p>
              </li>
            ))}
            {isBotThinking && (
              <li className="flex mt-2 ">
                {/* <BiLoaderCircle size={30}/>  */}
                <BsRobot className="w-4 h-4 self-end mr-2" />
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

export default Chatbot