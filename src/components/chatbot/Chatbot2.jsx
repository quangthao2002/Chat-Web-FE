import React, { useEffect, useRef, useState } from "react"
import { BsSend, BsRobot } from "react-icons/bs"
import { BiLoaderCircle } from "react-icons/bi"
import { useAuthContext } from "@/context/AuthContext"
import { useChatbotContext } from "@/context/ChatbotContext"
const Chatbot2 = () => {
  const { authUser } = useAuthContext()
  const username = authUser?.user?.username
  const { showChatbot } = useChatbotContext();
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([{ text: `Hi ${username}👋`, type: "bot" }])
  const [isBotThinking, setIsBotThinking] = useState(false)
  const API_KEY = "" // Điền API key chatgpt

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const handleChat = async () => {
    try {
      if (!message) return
      setIsBotThinking(true)
  
      // Add user message to messages
      setMessages(prevMessages => [...prevMessages, { text: message, type: "user" }])
  
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
      setMessages(prevMessages => [...prevMessages, { text: botMessage, type: "bot" }])
    } catch (err) {
      console.error(err)
    } finally {
      setIsBotThinking(false)
    }
  }
  return (
    <>
      {showChatbot && (
        <div className="relative bg-white shadow-2xl w-full flex-1 z-50 flex flex-col overflow-y-auto">
          {/* <div className="bg-blue-500 pt-4 pb-4 text-center relative ">
            <p className="font-bold text-white text-xl">Chatbot</p>
          </div> */}

          <ul className="p-4 overflow-y-auto flex-grow pb-28">
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
            />
            <BsSend className="text-gray-400 w-5 h-5 self-center cursor-pointer" onClick={handleChat} />
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot2
