import Message from "./Message.jsx"
import useGetMessages from "@/hooks/useGetMessages.js"
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx"
import { useEffect, useRef } from "react"
import Lottie from "react-lottie"
import animationData from "../../animations/typing.json"
import useConversation from "@/zustand/useConversation.js"

const Messages = () => {
  const { loading, messages } = useGetMessages()
  const lastMessage = useRef()
  const { isTyping, selectedConversation } = useConversation()


  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: "smooth" })
    }, 500)
  }, [messages])

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }

  return (
    <div className="px-4 flex-1 ">
      {!loading &&
        Array.isArray(messages) &&
        messages.map((message, index) => {
          return (
            <div key={index} ref={index === messages.length - 1 ? lastMessage : null}>
              <Message message={message} isLastMessage={index === messages.length - 1 ? true : false} />
            </div>
          )
        })}

      {isTyping ? (
        <div className="flex" style={{ marginTop: "16px" }}>
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS chat bubble component" src={selectedConversation.avatar} />
            </div>
          </div>
          <div style={{ height: "30px", marginLeft: "14px" }}>
            <Lottie
              options={defaultOptions}
              // height={50}
              width={70}
              style={{ marginBottom: 15, marginLeft: 0 }}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
      {loading && [1, 2, 3, 4].map((i) => <MessageSkeleton key={i} />)}
    </div>
  )
}

export default Messages
