/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChatbotContext } from "@/context/ConversationChatbotContext"
import useConversation from "@/zustand/useConversation"
import { SetStateAction, useRef, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BiLoaderCircle } from "react-icons/bi"
import { BsRobot, BsSend } from "react-icons/bs"
import { CiImageOn } from "react-icons/ci"
import { MdAttachFile } from "react-icons/md"
import { GoogleGenerativeAI } from "@google/generative-ai";



// Just reply to user input with the correct grammar, DO NOT reply to the context of the question or the user input.
// If the user input is grammatically correct and fluent, just reply "Sounds good."

const Chatbot2 = () => {
  const GEMINI_API_KEY = 'AIzaSyCR8K7wiULQSDXjs_6s_xki4Mrqo3_5xCU'
  const { showConversationChatbot } = useChatbotContext()
  const [message, setMessage] = useState("")
  const [image, setImage] = useState(null)
  const { messagesChatbot, setMessagesChatbot, selectedConversationChatbot } = useConversation()
  const [isBotThinking, setIsBotThinking] = useState(false)
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const fileInputRefForFile = useRef(null)
  // const [file, setFile] = useState(null)
  
  const handleIconClickForFile = () => {
    fileInputRefForFile.current.click()
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleIconClick = () => {
    fileInputRef.current.click()
  }
  const handleChangeMessage = (e: { target: { value: SetStateAction<string> } }) => {
    setMessage(e.target.value)
  }

  const chatbotMessages = messagesChatbot[selectedConversationChatbot?.id] || []

  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
      
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }
  const handleChat = async () => {
    try {

      if (!message) return
      setIsBotThinking(true)
      setMessagesChatbot(selectedConversationChatbot?.id, { text: message, type: "user" })
      if(image){
        const url= URL.createObjectURL(image)
        setMessagesChatbot(selectedConversationChatbot?.id, { text: url, type: "user" })
      }
      setMessage("")
      const promptText = `Act like you are an expert grammar checker. ${message}  Look for mistakes and make sentences more fluent. Please analyze the following text for a wide range of grammatical aspects and provide corrections. Be thorough in identifying and fixing any grammatical mistakes, including checking for correct punctuation usage, ensuring proper sentence structure, enhancing readability, identifying and correcting spelling mistakes, and verifying subject-verb agreement. Your assistance in ensuring the grammatical accuracy of the text is highly appreciated. Please be thorough in your examination, and provide comprehensive corrections to enhance the overall grammatical integrity of the text.`;
      setImage(null)
  
      if (image) {
        const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
        const imageParts = await Promise.all(
          [image].map(fileToGenerativePart)
        );
        const result = await model.generateContent([promptText, ...imageParts]);
        const response = await result.response;
        const text = response.text();
        setMessagesChatbot(selectedConversationChatbot?.id, { text: text, type: "bot" })

      } else {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(promptText);
        const response = await result.response;
        const text = response.text();
        setMessagesChatbot(selectedConversationChatbot?.id, { text: text, type: "bot" })
      }


    } catch (err) {
      console.error(err)
    } finally {
      setIsBotThinking(false)
    }
  }
  const handleImageChange = (e: any) => {
    
    setImage(e.target.files[0])
  }
  const handleRemoveImage = () => {
    setImage(null)
  }
  function isBlobUrl(url) {
    return url.startsWith('blob:');
  }
  
  const renderMessage=(msg:any)=> {
    if (isBlobUrl(msg.text)) {
      return (
        <img
          style={{ maxWidth: "400px", maxHeight: "400px" }}
          src={msg.text}
          alt="Uploaded"
        />
      );
    } else {
      return (
        <span
        className={`text-black font-semibold max-w-3xl p-3 rounded-lg ${
          msg.type === "user" ? "bg-blue-400 text-white mt-4 mb-4" : "bg-gray-300 ml-1 text-red-500"
        }`}
      >
        {msg.text}
      </span>
      );
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
                {renderMessage(msg)}
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
            {/* {file && (
              <div className="relative flex items-center">
                <span className="mr-2">{file?.name}</span>
                <AiOutlineClose color="gray" className="cursor-pointer" onClick={() => setFile(null)} />
              </div>
            )} */}
            {image && (
              <div className="relative">
                <img src={ URL.createObjectURL(image)} alt="preview" style={{ width: "60px", height: "60px", borderRadius: 5 }} />
                <AiOutlineClose
                  color="gray"
                  className="absolute top-0 right-0 cursor-pointer"
                  onClick={handleRemoveImage}
                />
              </div>
            )}
            <MdAttachFile
              onClick={handleIconClickForFile}
              size={25}
              className="text-gray-600 self-center cursor-pointer"
            />
            <input type="file" onChange={handleFileChange} style={{ display: "none" }} ref={fileInputRefForFile} />
            <CiImageOn onClick={handleIconClick} size={25} className="text-gray-600  self-center cursor-pointer" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <BsSend className="text-gray-400 w-5 h-5 self-center cursor-pointer" onClick={handleChat} />
          </div>
        </div>
      )}
    </>
  )
}

export default Chatbot2
