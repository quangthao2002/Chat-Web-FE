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

import Markdown from 'react-markdown'

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

  const chatbotMessages = messagesChatbot[selectedConversationChatbot.id] || []
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
      const promptText = `Bạn là một AI kiểm tra ngữ pháp chuyên nghiệp. Hãy phân tích kỹ lưỡng văn bản hoặc hình ảnh của người dùng về nhiều khía cạnh ngữ pháp, bao gồm dấu câu, chính tả, ngữ pháp và độ rõ ràng. 
      Mục tiêu của bạn là đưa ra các chỉnh sửa toàn diện và giải thích rõ ràng để nâng cao độ rõ ràng và chính xác tổng thể của bài viết.:
      
      Văn bản gốc: [Văn bản gốc của người dùng]
      Văn bản đã sửa: [Phiên bản văn bản đã được bạn sửa]
      Giải thích: [Giải thích quy tắc ngữ pháp và lý do tại sao phải thay đổi]
      
      Văn bản gốc: \ ${message}
      /* Example Output: 
      - Đoạn văn lúc đầu: Their going to the store, but they're not sure what to buy.  Its a tough decision, you know?  
      - Đoạn văn sau khi sửa: They're going to the store, but they're not sure what to buy. It's a tough decision, you know? 
      - Giải thích: 
        - "Their" sửa thành "They're" bởi vì nó là dạng viết tắt của "they are" 
        - "Its" sửa thành "It's"  bởi vì nó là dạng viết tắt của "it is". 
      Remember to just add one /n for each row
      Instead of using 
*/
      `
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
      const md = msg.text
      const tag=  msg.type === "user" ? 
      <p className="text-black max-w-3xl p-3 rounded-lg bg-blue-400 text-white mt-4 mb-4" > {msg.text}</p> : 
      <p className="text-black max-w-3xl p-3 rounded-lg bg-blue-400 text-white mt-4 mb-4"><Markdown>{md}</Markdown></p>
      return tag
       
       
      
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
