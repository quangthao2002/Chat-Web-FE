import Messages from "./Messages";

const MessageContainer = () => {
  return <div className="flex-1 overflow-auto bg-gray-300">
    <Messages />
  </div>;
};

export default MessageContainer;