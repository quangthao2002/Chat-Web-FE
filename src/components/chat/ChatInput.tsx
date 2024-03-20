import { useAuthContext } from "@/context/AuthContext";
import useConversation from "@/zustand/useConversation";
import useSocket from "@/zustand/useSocket";
import { useState } from "react";
import { BsSend } from "react-icons/bs"
import { MdEmojiEmotions } from "react-icons/md"
const ChatInput = () => {
  const { selectedConversation, messages, setMessages } = useConversation();
    const { authUser } = useAuthContext();
  const currentUserId = authUser.user.id;
  // console.log("currentId",currentUserId)
  const { sendMessage } = useSocket(currentUserId);

  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!selectedConversation) {
      return;
    }
    // gửi tin nhắn đến server
    sendMessage( selectedConversation.id, message);
    
    // thêm tin mới vào danh sách tin nhắn
    setMessages([...messages, { text: message, userId: currentUserId, recipientId: selectedConversation.id ,user: authUser.user}]);
    
    setMessage('');
  };
  return (
    <form className="pt-3 pl-4 pr-[10px] pb-[20px] " onSubmit={handleSendMessage}>
    <div className="h-[27px] w-full relative">
      <input
        type="text"
        className="border text-sm rounded-lg  block w-full p-2.5 bg-gray-100 border-gray-600 text-gray-600"
        placeholder={`Send a message to quangthao`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="absolute inset-y-0 end-0 items-center mr-10 px mt-3 cursor-pointer">
        <MdEmojiEmotions size={23} />
      </button>
      <button type="submit" className="absolute inset-y-0 end-0 items-center pe-3 mt-3 ">
        <BsSend size={20} className="text-gray-400" />
      </button>
    </div>
  </form>
  )};
    export default ChatInput;
