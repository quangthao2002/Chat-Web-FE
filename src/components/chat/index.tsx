import ChatInput from "./ChatInput";
import Action1 from "./actions/Action1";
import Action2 from "./actions/Action2";

const Chat = () => {
  return (
    <div>
      <div className="flex items-center border-y h-[46px] pl-2">
        <Action1 />
        <Action2 />
      </div>

      <ChatInput />
    </div>
  );
};

export default Chat;
