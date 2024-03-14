import Messages from "./Messages";

const MessageContainer = () => {
  return <div className="flex-1 overflow-auto bg-gray-300 max-h-[calc(100vh-175px)]">
    <Messages />
  </div>;
};

export default MessageContainer;